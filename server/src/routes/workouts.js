import { Router } from 'express';
import { z } from 'zod';
import { transaction } from '../db.js';
import { HttpError, parse, parseId } from '../http.js';
import { estimateOneRepMax } from '../lib/training.js';
import { getRoutine } from '../services/routines.js';
import { getFinishedWorkouts, getUserSets, muscleBreakdown, prCountsByWorkout } from '../services/training-data.js';
import {
  assertActive, getActiveWorkout, getOwnedWorkout, getWorkoutDetail, getWorkoutSummary, previousBestE1rm,
} from '../services/workouts.js';

const startBody = z.object({
  routine_id: z.number().int().positive().optional(),
  name: z.string().trim().min(1).max(60).optional(),
});

const setBody = z.object({
  exercise_id: z.number().int().positive(),
  weight_kg: z.number().min(0).max(1000),
  reps: z.number().int().min(1).max(100),
  rir: z.number().int().min(0).max(10).nullable().optional(),
});

const setUpdate = setBody.omit({ exercise_id: true }).partial().strict();

const addExerciseBody = z.object({
  exercise_id: z.number().int().positive(),
  target_sets: z.number().int().min(1).max(10).default(3),
  rep_min: z.number().int().min(1).max(50).default(8),
  rep_max: z.number().int().min(1).max(50).default(12),
  rest_seconds: z.number().int().min(0).max(600).default(90),
}).refine((e) => e.rep_min <= e.rep_max, { message: 'Minimum reps must not exceed maximum reps', path: ['rep_max'] });

const listQuery = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Expected YYYY-MM').optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

export default ({ db, now }) => {
  const router = Router();

  router.get('/', (req, res) => {
    const { month, limit } = parse(listQuery, req.query);
    let workouts = getFinishedWorkouts(db, req.user);
    if (month) workouts = workouts.filter((w) => w.date.startsWith(month));
    if (limit) workouts = workouts.slice(0, limit);

    const sets = getUserSets(db, req.user.id);
    const prCounts = prCountsByWorkout(sets);
    const setsByWorkout = Map.groupBy(sets, (s) => s.workout_id);
    res.json(workouts.map((w) => ({
      ...w,
      pr_count: prCounts.get(w.id) || 0,
      muscle_groups: muscleBreakdown(setsByWorkout.get(w.id) ?? []).map((m) => m.muscle_group),
    })));
  });

  router.get('/active', (req, res) => {
    const active = getActiveWorkout(db, req.user.id);
    res.json({ workout: active ? getWorkoutDetail(db, req.user, active.id) : null });
  });

  router.post('/', (req, res) => {
    const body = parse(startBody, req.body ?? {});
    const active = getActiveWorkout(db, req.user.id);
    if (active) {
      throw new HttpError(409, 'Finish or discard your current workout first', { workout_id: active.id });
    }

    const routine = body.routine_id ? getRoutine(db, req.user.id, body.routine_id) : null;
    const id = transaction(db, () => {
      const workoutId = db.prepare('INSERT INTO workouts (user_id, routine_id, name, started_at) VALUES (?, ?, ?, ?)')
        .run(req.user.id, routine?.id ?? null, body.name ?? routine?.name ?? 'Quick Workout', now().toISOString())
        .lastInsertRowid;
      const insert = db.prepare(`
        INSERT INTO workout_exercises (workout_id, position, exercise_id, target_sets, rep_min, rep_max, rest_seconds)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      routine?.exercises.forEach((ex, position) => {
        insert.run(workoutId, position, ex.exercise_id, ex.target_sets, ex.rep_min, ex.rep_max, ex.rest_seconds);
      });
      return workoutId;
    });
    res.status(201).json(getWorkoutDetail(db, req.user, id));
  });

  router.get('/:id', (req, res) => {
    res.json(getWorkoutDetail(db, req.user, parseId(req.params.id, 'Workout')));
  });

  router.get('/:id/summary', (req, res) => {
    res.json(getWorkoutSummary(db, req.user, parseId(req.params.id, 'Workout')));
  });

  router.post('/:id/exercises', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    assertActive(workout);
    const body = parse(addExerciseBody, req.body);
    if (!db.prepare('SELECT 1 FROM exercises WHERE id = ?').get(body.exercise_id)) {
      throw new HttpError(400, 'Unknown exercise');
    }
    if (db.prepare('SELECT 1 FROM workout_exercises WHERE workout_id = ? AND exercise_id = ?').get(workout.id, body.exercise_id)) {
      throw new HttpError(409, 'That exercise is already in this workout');
    }
    const position = db.prepare('SELECT COALESCE(MAX(position) + 1, 0) AS next FROM workout_exercises WHERE workout_id = ?')
      .get(workout.id).next;
    db.prepare(`
      INSERT INTO workout_exercises (workout_id, position, exercise_id, target_sets, rep_min, rep_max, rest_seconds)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(workout.id, position, body.exercise_id, body.target_sets, body.rep_min, body.rep_max, body.rest_seconds);
    res.status(201).json(getWorkoutDetail(db, req.user, workout.id));
  });

  router.post('/:id/sets', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    assertActive(workout);
    const body = parse(setBody, req.body);
    if (!db.prepare('SELECT 1 FROM workout_exercises WHERE workout_id = ? AND exercise_id = ?').get(workout.id, body.exercise_id)) {
      throw new HttpError(400, 'Add the exercise to this workout before logging sets for it');
    }

    const e1rm = estimateOneRepMax(body.weight_kg, body.reps);
    const previousBest = previousBestE1rm(db, req.user.id, workout, body.exercise_id);
    const bestToday = Math.max(0, ...db.prepare('SELECT weight_kg, reps FROM workout_sets WHERE workout_id = ? AND exercise_id = ?')
      .all(workout.id, body.exercise_id).map((s) => estimateOneRepMax(s.weight_kg, s.reps)));

    const setId = db.prepare('INSERT INTO workout_sets (workout_id, exercise_id, weight_kg, reps, rir, logged_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run(workout.id, body.exercise_id, body.weight_kg, body.reps, body.rir ?? null, now().toISOString()).lastInsertRowid;

    res.status(201).json({
      set: db.prepare('SELECT id, exercise_id, weight_kg, reps, rir, logged_at FROM workout_sets WHERE id = ?').get(setId),
      e1rm,
      is_pr: previousBest != null && e1rm > previousBest && e1rm > bestToday,
    });
  });

  router.patch('/:id/sets/:setId', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    assertActive(workout);
    const changes = parse(setUpdate, req.body);
    const setId = parseId(req.params.setId, 'Set');
    const fields = Object.keys(changes);
    if (fields.length) {
      const result = db.prepare(`UPDATE workout_sets SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ? AND workout_id = ?`)
        .run(...fields.map((f) => changes[f] ?? null), setId, workout.id);
      if (!result.changes) throw new HttpError(404, 'Set not found');
    }
    const set = db.prepare('SELECT id, exercise_id, weight_kg, reps, rir, logged_at FROM workout_sets WHERE id = ? AND workout_id = ?')
      .get(setId, workout.id);
    if (!set) throw new HttpError(404, 'Set not found');
    res.json(set);
  });

  router.delete('/:id/sets/:setId', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    assertActive(workout);
    const result = db.prepare('DELETE FROM workout_sets WHERE id = ? AND workout_id = ?')
      .run(parseId(req.params.setId, 'Set'), workout.id);
    if (!result.changes) throw new HttpError(404, 'Set not found');
    res.status(204).end();
  });

  router.post('/:id/finish', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    assertActive(workout);
    const { n } = db.prepare('SELECT COUNT(*) AS n FROM workout_sets WHERE workout_id = ?').get(workout.id);
    if (!n) throw new HttpError(400, 'Log at least one set, or discard the workout instead');
    db.prepare('UPDATE workouts SET finished_at = ? WHERE id = ?').run(now().toISOString(), workout.id);
    res.json(getWorkoutSummary(db, req.user, workout.id));
  });

  router.delete('/:id', (req, res) => {
    const workout = getOwnedWorkout(db, req.user.id, parseId(req.params.id, 'Workout'));
    db.prepare('DELETE FROM workouts WHERE id = ?').run(workout.id);
    res.status(204).end();
  });

  return router;
};
