import { Router } from 'express';
import { z } from 'zod';
import { transaction } from '../db.js';
import { HttpError, parse, parseId } from '../http.js';
import {
  assertExercisesExist, getRoutine, getSchedule, listRoutines, replaceRoutineExercises, setSchedule,
} from '../services/routines.js';

const routineExercise = z.object({
  exercise_id: z.number().int().positive(),
  target_sets: z.number().int().min(1).max(10),
  rep_min: z.number().int().min(1).max(50),
  rep_max: z.number().int().min(1).max(50),
  rest_seconds: z.number().int().min(0).max(600).default(90),
}).refine((e) => e.rep_min <= e.rep_max, { message: 'Minimum reps must not exceed maximum reps', path: ['rep_max'] });

const routineBody = z.object({
  name: z.string().trim().min(1).max(60),
  exercises: z.array(routineExercise).min(1, 'Add at least one exercise').max(20)
    .refine((list) => new Set(list.map((e) => e.exercise_id)).size === list.length, 'Each exercise can only appear once'),
});

const scheduleBody = z.object({
  days: z.array(z.object({
    weekday: z.number().int().min(0).max(6),
    routine_id: z.number().int().positive().nullable(),
  })).min(1).max(7)
    .refine((days) => new Set(days.map((d) => d.weekday)).size === days.length, 'Each weekday can only appear once'),
});

export const routinesRouter = ({ db }) => {
  const router = Router();

  router.get('/', (req, res) => res.json(listRoutines(db, req.user.id)));

  router.get('/:id', (req, res) => {
    res.json(getRoutine(db, req.user.id, parseId(req.params.id, 'Routine')));
  });

  router.post('/', (req, res) => {
    const body = parse(routineBody, req.body);
    assertExercisesExist(db, body.exercises.map((e) => e.exercise_id));
    const id = transaction(db, () => {
      const routineId = db.prepare('INSERT INTO routines (user_id, name) VALUES (?, ?)')
        .run(req.user.id, body.name).lastInsertRowid;
      replaceRoutineExercises(db, routineId, body.exercises);
      return routineId;
    });
    res.status(201).json(getRoutine(db, req.user.id, id));
  });

  router.put('/:id', (req, res) => {
    const routine = getRoutine(db, req.user.id, parseId(req.params.id, 'Routine'));
    const body = parse(routineBody, req.body);
    assertExercisesExist(db, body.exercises.map((e) => e.exercise_id));
    transaction(db, () => {
      db.prepare('UPDATE routines SET name = ? WHERE id = ?').run(body.name, routine.id);
      replaceRoutineExercises(db, routine.id, body.exercises);
    });
    res.json(getRoutine(db, req.user.id, routine.id));
  });

  router.delete('/:id', (req, res) => {
    const routine = getRoutine(db, req.user.id, parseId(req.params.id, 'Routine'));
    db.prepare('DELETE FROM routines WHERE id = ?').run(routine.id);
    res.status(204).end();
  });

  return router;
};

export const scheduleRouter = ({ db }) => {
  const router = Router();

  router.get('/', (req, res) => res.json(getSchedule(db, req.user.id)));

  router.put('/', (req, res) => {
    const { days } = parse(scheduleBody, req.body);
    const routineIds = [...new Set(days.map((d) => d.routine_id).filter((id) => id != null))];
    if (routineIds.length) {
      const owned = db.prepare(`
        SELECT COUNT(*) AS n FROM routines WHERE user_id = ? AND id IN (${routineIds.map(() => '?').join(',')})
      `).get(req.user.id, ...routineIds).n;
      if (owned !== routineIds.length) throw new HttpError(400, 'Unknown routine in schedule');
    }
    transaction(db, () => setSchedule(db, req.user.id, days));
    res.json(getSchedule(db, req.user.id));
  });

  return router;
};
