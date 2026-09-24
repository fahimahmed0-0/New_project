import path from 'node:path';

export const config = {
  port: Number(process.env.PORT) || 3001,
  dbPath: process.env.DB_PATH || path.resolve(import.meta.dirname, '../data/progressfit.db'),
  sessionTtlDays: Number(process.env.SESSION_TTL_DAYS) || 30,
  // Built frontend, served by the API in production (`npm run build` at the project root)
  staticDir: process.env.STATIC_DIR || path.resolve(import.meta.dirname, '../../dist'),
};
