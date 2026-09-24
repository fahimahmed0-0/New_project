import { Router } from 'express';
import { getTemplate, templates } from '../catalog/templates.js';
import { transaction } from '../db.js';
import { notFound } from '../http.js';
import { WEEKDAY_NAMES } from '../lib/dates.js';
import { getSchedule, listRoutines, replaceRoutineExercises, setSchedule } from '../services/routines.js';

const describe = (t) => ({
  id: t.id,
  name: t.name,
  description: t.description,
  days_per_week: t.schedule.filter((i) => i != null).length,
  routines: t.routines.map((r) => ({ name: r.name, exercise_count: r.exercises.length })),
  schedule: t.schedule.map((i, weekday) => ({ day: WEEKDAY_NAMES[weekday], routine: i == null ? null : t.routines[i].name })),
});

export default ({ db }) => {
  const router = Router();

  router.get('/', (_req, res) => res.json(templates.map(describe)));

  // Creates the template's routines for the user and replaces their weekly schedule
  router.post('/:id/apply', (req, res) => {
    const template = getTemplate(req.params.id);
    if (!template) throw notFound('Template');

    const slugToId = new Map(db.prepare('SELECT id, slug FROM exercises').all().map((e) => [e.slug, e.id]));

    transaction(db, () => {
      const routineIds = template.routines.map((routine) => {
        const id = db.prepare('INSERT INTO routines (user_id, name) VALUES (?, ?)')
          .run(req.user.id, routine.name).lastInsertRowid;
        replaceRoutineExercises(db, id, routine.exercises.map(([slug, sets, repMin, repMax, rest]) => ({
          exercise_id: slugToId.get(slug), target_sets: sets, rep_min: repMin, rep_max: repMax, rest_seconds: rest,
        })));
        return id;
      });
      setSchedule(db, req.user.id, template.schedule.map((i, weekday) => ({
        weekday, routine_id: i == null ? null : routineIds[i],
      })));
    });

    res.status(201).json({ routines: listRoutines(db, req.user.id), schedule: getSchedule(db, req.user.id) });
  });

  return router;
};
