import { HttpError, notFound } from '../http.js';
import { localDate } from '../lib/dates.js';
import { estimateOneRepMax, findWorkoutPrs, round1, setVolume, suggestNextTarget } from '../lib/training.js';
import { getUserSets, muscleBreakdown } from './training-data.js';

export const getOwnedWorkout = (db, userId, workoutId) => {
  const workout = db.prepare('SELECT * FROM workouts WHERE id = ? AND user_id = ?').get(workoutId, userId);
  if (!workout) throw notFound('Workout');
  return workout;
};

export const getActiveWorkout = (db, userId) =>
  db.prepare('SELECT * FROM workouts WHERE user_id = ? AND finished_at IS NULL').get(userId);

export const assertActive = (workout) => {
  if (workout.finished_at) throw new HttpError(409, 'This workout is already finished');
};

// Sets from the most recent earlier finished workout that included the exercise
const previousPerformance = (db, userId, workout, exerciseId) => {
  const previousWorkout = db.prepare(`
    SELECT w.id, w.started_at FROM workouts w
    WHERE w.user_id = ? AND w.id != ? AND w.finished_at IS NOT NULL AND w.started_at < ?
      AND EXISTS (SELECT 1 FROM workout_sets s WHERE s.workout_id = w.id AND s.exercise_id = ?)
    ORDER BY w.started_at DESC LIMIT 1
  `).get(userId, workout.id, workout.started_at, exerciseId);
  if (!previousWorkout) return null;

  const sets = db.prepare(`
    SELECT weight_kg, reps, rir FROM workout_sets WHERE workout_id = ? AND exercise_id = ? ORDER BY id
  `).all(previousWorkout.id, exerciseId);
  return { workout_id: previousWorkout.id, started_at: previousWorkout.started_at, sets };
};

// Best estimated 1RM for an exercise across workouts started before this one
export const previousBestE1rm = (db, userId, workout, exerciseId) => {
  const rows = db.prepare(`
    SELECT s.weight_kg, s.reps FROM workout_sets s JOIN workouts w ON w.id = s.workout_id
    WHERE w.user_id = ? AND s.exercise_id = ? AND w.id != ? AND w.started_at < ?
  `).all(userId, exerciseId, workout.id, workout.started_at);
  if (!rows.length) return null;
  return Math.max(...rows.map((r) => estimateOneRepMax(r.weight_kg, r.reps)));
};

export const getWorkoutDetail = (db, user, workoutId) => {
  const workout = getOwnedWorkout(db, user.id, workoutId);
  const plan = db.prepare(`
    SELECT we.exercise_id, we.target_sets, we.rep_min, we.rep_max, we.rest_seconds,
           e.name, e.muscle_group, e.category, e.equipment, e.image_url, e.video_url
    FROM workout_exercises we JOIN exercises e ON e.id = we.exercise_id
    WHERE we.workout_id = ? ORDER BY we.position
  `).all(workout.id);
  const sets = db.prepare(`
    SELECT id, exercise_id, weight_kg, reps, rir, logged_at FROM workout_sets WHERE workout_id = ? ORDER BY id
  `).all(workout.id);

  const exercises = plan.map((ex) => {
    const previous = previousPerformance(db, user.id, workout, ex.exercise_id);
    return {
      ...ex,
      sets: sets.filter((s) => s.exercise_id === ex.exercise_id),
      previous: previous && { date: localDate(previous.started_at, user.timezone), sets: previous.sets },
      target: suggestNextTarget({
        lastSets: previous?.sets, repMin: ex.rep_min, repMax: ex.rep_max, exercise: ex,
      }),
    };
  });

  return {
    id: workout.id,
    name: workout.name,
    routine_id: workout.routine_id,
    started_at: workout.started_at,
    finished_at: workout.finished_at,
    set_count: sets.length,
    volume: round1(sets.reduce((total, s) => total + setVolume(s), 0)),
    exercises,
  };
};

export const getWorkoutSummary = (db, user, workoutId) => {
  const workout = getOwnedWorkout(db, user.id, workoutId);
  if (!workout.finished_at) throw new HttpError(409, 'This workout is still in progress');

  const allSets = getUserSets(db, user.id);
  const sets = allSets.filter((s) => s.workout_id === workout.id);
  const prs = findWorkoutPrs(allSets).get(workout.id) || [];
  const names = new Map(sets.map((s) => [s.exercise_id, s.exercise_name]));

  const exercises = [];
  for (const s of sets) {
    let entry = exercises.find((e) => e.exercise_id === s.exercise_id);
    if (!entry) {
      entry = { exercise_id: s.exercise_id, name: s.exercise_name, muscle_group: s.muscle_group, sets: [] };
      exercises.push(entry);
    }
    entry.sets.push({ weight_kg: s.weight_kg, reps: s.reps, rir: s.rir });
  }

  return {
    id: workout.id,
    name: workout.name,
    date: localDate(workout.started_at, user.timezone),
    started_at: workout.started_at,
    finished_at: workout.finished_at,
    duration_s: Math.round((Date.parse(workout.finished_at) - Date.parse(workout.started_at)) / 1000),
    exercise_count: exercises.length,
    set_count: sets.length,
    volume: round1(sets.reduce((total, s) => total + setVolume(s), 0)),
    muscles: muscleBreakdown(sets),
    prs: prs.map((pr) => ({ ...pr, name: names.get(pr.exercise_id) })),
    exercises,
  };
};
