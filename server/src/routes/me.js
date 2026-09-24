import { Router } from 'express';
import { z } from 'zod';
import { parse } from '../http.js';
import { isValidTimeZone } from '../lib/dates.js';

export const publicUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  age: user.age,
  weight_kg: user.weight_kg,
  height_cm: user.height_cm,
  training_age_years: user.training_age_years,
  timezone: user.timezone,
  calorie_target: user.calorie_target,
  protein_target_g: user.protein_target_g,
  water_target_ml: user.water_target_ml,
  sleep_target_hours: user.sleep_target_hours,
  created_at: user.created_at,
});

const optionalNumber = (schema) => schema.nullable().optional();

const profileUpdate = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  age: optionalNumber(z.number().int().min(10).max(120)),
  weight_kg: optionalNumber(z.number().min(20).max(400)),
  height_cm: optionalNumber(z.number().min(100).max(250)),
  training_age_years: optionalNumber(z.number().min(0).max(80)),
  timezone: z.string().refine(isValidTimeZone, 'Unknown timezone').optional(),
  calorie_target: z.number().int().min(800).max(10000).optional(),
  protein_target_g: z.number().int().min(20).max(500).optional(),
  water_target_ml: z.number().int().min(500).max(10000).optional(),
  sleep_target_hours: z.number().min(4).max(12).optional(),
}).strict();

export default ({ db }) => {
  const router = Router();

  router.get('/', (req, res) => res.json(publicUser(req.user)));

  router.patch('/', (req, res) => {
    const changes = parse(profileUpdate, req.body);
    const fields = Object.keys(changes);
    if (fields.length) {
      db.prepare(`UPDATE users SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`)
        .run(...fields.map((f) => changes[f]), req.user.id);
    }
    res.json(publicUser(db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id)));
  });

  return router;
};
