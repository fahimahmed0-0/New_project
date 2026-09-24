import { Router } from 'express';
import { z } from 'zod';
import { MUSCLE_GROUPS } from '../catalog/exercises.js';
import { notFound, parse, parseId } from '../http.js';
import { localDate } from '../lib/dates.js';
import { progressStatus, round1, suggestNextTarget } from '../lib/training.js';
import { getUserSets, personalRecords, sessionsByExercise } from '../services/training-data.js';

export const shapeExercise = (e) => ({
  id: e.id,
  name: e.name,
  muscle_group: e.muscle_group,
  category: e.category,
  equipment: e.equipment,
  image_url: e.image_url,
  video_url: e.video_url,
});

const listQuery = z.object({
  q: z.string().trim().max(100).optional(),
  muscle: z.enum(MUSCLE_GROUPS).optional(),
});

const DEFAULT_REP_RANGE = { rep_min: 8, rep_max: 12 };

export default ({ db, now }) => {
  const router = Router();

  router.get('/', (req, res) => {
    const { q, muscle } = parse(listQuery, req.query);
    const where = [];
    const params = [];
    if (q) {
      where.push("name LIKE ? ESCAPE '\\'");
      params.push(`%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
    }
    if (muscle) {
      where.push('muscle_group = ?');
      params.push(muscle);
    }
    const rows = db.prepare(`
      SELECT * FROM exercises ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY muscle_group, name
    `).all(...params);
    res.json({ muscle_groups: MUSCLE_GROUPS, exercises: rows.map(shapeExercise) });
  });

  router.get('/:id', (req, res) => {
    const id = parseId(req.params.id, 'Exercise');
    const exercise = db.prepare('SELECT * FROM exercises WHERE id = ?').get(id);
    if (!exercise) throw notFound('Exercise');

    const { timezone } = req.user;
    const sets = getUserSets(db, req.user.id, { exerciseId: id });
    const sessions = sessionsByExercise(sets, timezone).get(id)?.sessions ?? [];
    const today = localDate(now(), timezone);
    const last = sessions.at(-1);
    const previous = sessions.at(-2);

    // Use the rep range from the user's most recent routine containing this exercise
    const plan = db.prepare(`
      SELECT re.rep_min, re.rep_max FROM routine_exercises re JOIN routines r ON r.id = re.routine_id
      WHERE r.user_id = ? AND re.exercise_id = ? ORDER BY r.created_at DESC, r.id DESC LIMIT 1
    `).get(req.user.id, id) ?? DEFAULT_REP_RANGE;

    const sessionView = (s) => s && { workout_id: s.workout_id, date: s.date, e1rm: s.e1rm, sets: s.sets };

    res.json({
      exercise: shapeExercise(exercise),
      stats: {
        ...progressStatus(sessions, today),
        best: personalRecords(sets, timezone)[0] ?? null,
        current_e1rm: last?.e1rm ?? null,
        session_count: sessions.length,
        total_volume: round1(sessions.reduce((total, s) => total + s.volume, 0)),
      },
      last_session: sessionView(last) ?? null,
      previous_session: sessionView(previous) ?? null,
      next_target: suggestNextTarget({
        lastSets: last?.sets, repMin: plan.rep_min, repMax: plan.rep_max, exercise,
      }),
      progression: sessions.slice(-20).map((s) => ({
        date: s.date, e1rm: s.e1rm, top_weight: s.top_weight, top_reps: s.top_reps,
      })),
      history: sessions.slice(-20).reverse().map(sessionView),
    });
  });

  return router;
};
