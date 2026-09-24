import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { exerciseCatalog } from './catalog/exercises.js';

const migrationsDir = path.resolve(import.meta.dirname, 'migrations');

export const openDb = (file) => {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA foreign_keys = ON;');
  if (file !== ':memory:') db.exec('PRAGMA journal_mode = WAL;');
  migrate(db);
  syncCatalog(db);
  return db;
};

// Applies migrations/NNN_*.sql in order, tracking progress in PRAGMA user_version
const migrate = (db) => {
  const current = db.prepare('PRAGMA user_version').get().user_version;
  const files = fs.readdirSync(migrationsDir).filter((f) => /^\d+_.*\.sql$/.test(f)).sort();

  for (const file of files) {
    const version = Number.parseInt(file, 10);
    if (version <= current) continue;
    transaction(db, () => {
      db.exec(fs.readFileSync(path.join(migrationsDir, file), 'utf8'));
      db.exec(`PRAGMA user_version = ${version}`);
    });
  }
};

const syncCatalog = (db) => {
  const upsert = db.prepare(`
    INSERT INTO exercises (slug, name, muscle_group, category, equipment, image_url, video_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (slug) DO UPDATE SET
      name = excluded.name, muscle_group = excluded.muscle_group, category = excluded.category,
      equipment = excluded.equipment, image_url = excluded.image_url, video_url = excluded.video_url
  `);
  transaction(db, () => {
    for (const ex of exerciseCatalog) {
      upsert.run(ex.slug, ex.name, ex.muscleGroup, ex.category, ex.equipment, ex.imageUrl, ex.videoUrl);
    }
  });
};

export const transaction = (db, fn) => {
  db.exec('BEGIN');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
};
