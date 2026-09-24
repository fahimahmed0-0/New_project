import { Router } from 'express';
import { z } from 'zod';
import { createSession, deleteSession, DUMMY_HASH, hashPassword, requireAuth, verifyPassword } from '../auth.js';
import { HttpError, parse } from '../http.js';
import { isValidTimeZone } from '../lib/dates.js';
import { publicUser } from './me.js';

const credentials = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
});

const registration = credentials.extend({
  name: z.string().trim().min(1).max(60),
  timezone: z.string().refine(isValidTimeZone, 'Unknown timezone').optional(),
});

const isUniqueViolation = (err) => String(err?.message).includes('UNIQUE constraint failed');

export default (ctx) => {
  const { db, now } = ctx;
  const router = Router();

  router.post('/register', async (req, res) => {
    const body = parse(registration, req.body);
    const passwordHash = await hashPassword(body.password);

    let userId;
    try {
      userId = db.prepare('INSERT INTO users (email, password_hash, name, timezone) VALUES (?, ?, ?, ?)')
        .run(body.email, passwordHash, body.name, body.timezone ?? 'UTC').lastInsertRowid;
    } catch (err) {
      if (isUniqueViolation(err)) throw new HttpError(409, 'An account with this email already exists');
      throw err;
    }

    const token = createSession(db, userId, now());
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    res.status(201).json({ token, user: publicUser(user) });
  });

  router.post('/login', async (req, res) => {
    const body = parse(credentials, req.body);
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(body.email);
    const valid = await verifyPassword(body.password, user?.password_hash ?? DUMMY_HASH);
    if (!user || !valid) throw new HttpError(401, 'Incorrect email or password');

    const token = createSession(db, user.id, now());
    res.json({ token, user: publicUser(user) });
  });

  router.post('/logout', requireAuth(ctx), (req, res) => {
    deleteSession(db, req.token);
    res.status(204).end();
  });

  return router;
};
