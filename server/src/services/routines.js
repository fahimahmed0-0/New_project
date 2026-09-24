import { WEEKDAY_NAMES } from '../lib/dates.js';
import { HttpError, notFound } from '../http.js';

// Rough session length: each set plus its rest period, assuming ~40s under the bar
const estimateMinutes = (exercises) => {
  const seconds = exercises.reduce((total, ex) => total + ex.target_sets * (ex.rest_seconds + 40), 0);
  return Math.max(5, Math.round(seconds / 60 / 5) * 5);
};

const shapeRoutine = (routine, exercises) => ({
  id: routine.id,
  name: routine.name,
  created_at: routine.created_at,
  exercise_count: exercises.length,
  muscle_groups: [...new Set(exercises.map((ex) => ex.muscle_group))],
  est_minutes: exercises.length ? estimateMinutes(exercises) : 0,
  exercises,
});

const exerciseRows = (db, routineIds) => {
  if (!routineIds.length) return [];
  return db.prepare(`
    SELECT re.routine_id, re.exercise_id, re.target_sets, re.rep_min, re.rep_max, re.rest_seconds,
           e.name, e.muscle_group, e.category, e.equipment, e.image_url
    FROM routine_exercises re JOIN exercises e ON e.id = re.exercise_id
    WHERE re.routine_id IN (${routineIds.map(() => '?').join(',')})
    ORDER BY re.routine_id, re.position
  `).all(...routineIds);
};

export const listRoutines = (db, userId) => {
  const routines = db.prepare('SELECT * FROM routines WHERE user_id = ? ORDER BY created_at, id').all(userId);
  const rows = exerciseRows(db, routines.map((r) => r.id));
  return routines.map((r) => shapeRoutine(r, rows
    .filter((row) => row.routine_id === r.id)
    .map(({ routine_id, ...ex }) => ex)));
};

export const getRoutine = (db, userId, routineId) => {
  const routine = db.prepare('SELECT * FROM routines WHERE id = ? AND user_id = ?').get(routineId, userId);
  if (!routine) throw notFound('Routine');
  return shapeRoutine(routine, exerciseRows(db, [routine.id]).map(({ routine_id, ...ex }) => ex));
};

export const assertExercisesExist = (db, exerciseIds) => {
  const unique = [...new Set(exerciseIds)];
  if (!unique.length) return;
  const found = db.prepare(`SELECT COUNT(*) AS n FROM exercises WHERE id IN (${unique.map(() => '?').join(',')})`)
    .get(...unique).n;
  if (found !== unique.length) throw new HttpError(400, 'Unknown exercise in list');
};

export const replaceRoutineExercises = (db, routineId, exercises) => {
  db.prepare('DELETE FROM routine_exercises WHERE routine_id = ?').run(routineId);
  const insert = db.prepare(`
    INSERT INTO routine_exercises (routine_id, position, exercise_id, target_sets, rep_min, rep_max, rest_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  exercises.forEach((ex, position) => {
    insert.run(routineId, position, ex.exercise_id, ex.target_sets, ex.rep_min, ex.rep_max, ex.rest_seconds);
  });
};

export const getSchedule = (db, userId) => {
  const rows = db.prepare(`
    SELECT s.weekday, r.id AS routine_id, r.name AS routine_name
    FROM schedule s JOIN routines r ON r.id = s.routine_id
    WHERE s.user_id = ?
  `).all(userId);
  const byDay = new Map(rows.map((row) => [row.weekday, row]));
  return WEEKDAY_NAMES.map((day, weekday) => {
    const row = byDay.get(weekday);
    return { weekday, day, routine: row ? { id: row.routine_id, name: row.routine_name } : null };
  });
};

export const setSchedule = (db, userId, days) => {
  const upsert = db.prepare(`
    INSERT INTO schedule (user_id, weekday, routine_id) VALUES (?, ?, ?)
    ON CONFLICT (user_id, weekday) DO UPDATE SET routine_id = excluded.routine_id
  `);
  for (const { weekday, routine_id } of days) upsert.run(userId, weekday, routine_id);
};
