// Read models built from a user's logged sets. Everything here is computed on read; a single
// lifter's history is small enough that this stays cheap and never goes stale.
import { localDate } from '../lib/dates.js';
import { estimateOneRepMax, findWorkoutPrs, round1, setVolume } from '../lib/training.js';

// Chronological, each workout's sets contiguous (what findWorkoutPrs expects)
export const getUserSets = (db, userId, { exerciseId } = {}) => db.prepare(`
  SELECT s.id, s.workout_id, s.exercise_id, s.weight_kg, s.reps, s.rir, s.logged_at,
         w.started_at, w.finished_at, e.name AS exercise_name, e.muscle_group, e.category
  FROM workout_sets s
  JOIN workouts w ON w.id = s.workout_id
  JOIN exercises e ON e.id = s.exercise_id
  WHERE w.user_id = ? AND w.finished_at IS NOT NULL ${exerciseId ? 'AND s.exercise_id = ?' : ''}
  ORDER BY w.started_at, w.id, s.id
`).all(...(exerciseId ? [userId, exerciseId] : [userId]));

export const getFinishedWorkouts = (db, user) => db.prepare(`
  SELECT w.id, w.name, w.routine_id, w.started_at, w.finished_at,
         COUNT(s.id) AS set_count,
         COUNT(DISTINCT s.exercise_id) AS exercise_count,
         COALESCE(SUM(s.weight_kg * s.reps), 0) AS volume
  FROM workouts w LEFT JOIN workout_sets s ON s.workout_id = w.id
  WHERE w.user_id = ? AND w.finished_at IS NOT NULL
  GROUP BY w.id
  ORDER BY w.started_at DESC
`).all(user.id).map((w) => ({
  ...w,
  date: localDate(w.started_at, user.timezone),
  duration_s: Math.round((Date.parse(w.finished_at) - Date.parse(w.started_at)) / 1000),
  volume: round1(w.volume),
}));

// Map<exercise_id, { exercise, sessions: [{ workout_id, date, e1rm, top_weight, top_reps, volume, sets }] }>
export const sessionsByExercise = (sets, timeZone) => {
  const result = new Map();
  for (const s of sets) {
    if (!result.has(s.exercise_id)) {
      result.set(s.exercise_id, {
        exercise: { id: s.exercise_id, name: s.exercise_name, muscle_group: s.muscle_group, category: s.category },
        sessions: [],
      });
    }
    const { sessions } = result.get(s.exercise_id);
    let session = sessions.at(-1);
    if (!session || session.workout_id !== s.workout_id) {
      session = {
        workout_id: s.workout_id, date: localDate(s.started_at, timeZone),
        e1rm: 0, top_weight: 0, top_reps: 0, volume: 0, sets: [],
      };
      sessions.push(session);
    }
    const e1rm = estimateOneRepMax(s.weight_kg, s.reps);
    if (e1rm > session.e1rm || (session.sets.length === 0)) {
      Object.assign(session, { e1rm, top_weight: s.weight_kg, top_reps: s.reps });
    }
    session.volume = round1(session.volume + setVolume(s));
    session.sets.push({ id: s.id, weight_kg: s.weight_kg, reps: s.reps, rir: s.rir });
  }
  return result;
};

// All-time best set per exercise, most recent first
export const personalRecords = (sets, timeZone) => {
  const best = new Map();
  for (const s of sets) {
    const e1rm = estimateOneRepMax(s.weight_kg, s.reps);
    const current = best.get(s.exercise_id);
    if (!current || e1rm > current.e1rm) {
      best.set(s.exercise_id, {
        exercise_id: s.exercise_id, name: s.exercise_name, muscle_group: s.muscle_group,
        weight_kg: s.weight_kg, reps: s.reps, e1rm, date: localDate(s.started_at, timeZone),
      });
    }
  }
  return [...best.values()].filter((pr) => pr.e1rm > 0).sort((a, b) => b.date.localeCompare(a.date));
};

export const prCountsByWorkout = (sets) => {
  const counts = new Map();
  for (const [workoutId, prs] of findWorkoutPrs(sets)) counts.set(workoutId, prs.length);
  return counts;
};

// Share of working sets per muscle group, largest first
export const muscleBreakdown = (sets) => {
  const counts = new Map();
  for (const s of sets) counts.set(s.muscle_group, (counts.get(s.muscle_group) || 0) + 1);
  const total = sets.length;
  return [...counts.entries()]
    .map(([muscle_group, count]) => ({ muscle_group, sets: count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.sets - a.sets);
};
