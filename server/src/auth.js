import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { config } from './config.js';
import { HttpError } from './http.js';

const scrypt = promisify(crypto.scrypt);
const SCRYPT = { N: 16384, r: 8, p: 1 };
const KEY_LENGTH = 64;

export const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt, KEY_LENGTH, SCRYPT);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
};

export const verifyPassword = async (password, stored) => {
  const [scheme, saltB64, keyB64] = stored.split('$');
  if (scheme !== 'scrypt') return false;
  const expected = Buffer.from(keyB64, 'base64');
  const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, SCRYPT);
  return crypto.timingSafeEqual(actual, expected);
};

// Verified against when the email is unknown, so response time doesn't reveal which emails exist
export const DUMMY_HASH = await hashPassword(crypto.randomUUID());

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const createSession = (db, userId, now) => {
  const token = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(now.getTime() + config.sessionTtlDays * 86_400_000).toISOString();
  db.prepare('DELETE FROM sessions WHERE user_id = ? AND expires_at <= ?').run(userId, now.toISOString());
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .run(hashToken(token), userId, expiresAt);
  return token;
};

export const deleteSession = (db, token) => {
  db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(token));
};

const bearerToken = (req) => {
  const header = req.get('authorization') || '';
  const [scheme, token] = header.split(' ');
  return scheme?.toLowerCase() === 'bearer' && token ? token : null;
};

export const requireAuth = ({ db, now }) => (req, _res, next) => {
  const token = bearerToken(req);
  if (!token) throw new HttpError(401, 'Not signed in');

  const user = db.prepare(`
    SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?
  `).get(hashToken(token), now().toISOString());
  if (!user) throw new HttpError(401, 'Session expired, please sign in again');

  delete user.password_hash;
  req.user = user;
  req.token = token;
  next();
};
