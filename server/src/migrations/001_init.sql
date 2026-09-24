CREATE TABLE users (
  id                  INTEGER PRIMARY KEY,
  email               TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash       TEXT NOT NULL,
  name                TEXT NOT NULL,
  age                 INTEGER,
  weight_kg           REAL,
  height_cm           REAL,
  training_age_years  REAL,
  timezone            TEXT NOT NULL DEFAULT 'UTC',
  calorie_target      INTEGER NOT NULL DEFAULT 2500,
  protein_target_g    INTEGER NOT NULL DEFAULT 150,
  water_target_ml     INTEGER NOT NULL DEFAULT 3000,
  sleep_target_hours  REAL NOT NULL DEFAULT 8,
  created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Opaque bearer tokens; only the SHA-256 of the token is stored
CREATE TABLE sessions (
  token_hash  TEXT PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  expires_at  TEXT NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);

-- Built-in catalog, synced from src/catalog/exercises.js on startup
CREATE TABLE exercises (
  id            INTEGER PRIMARY KEY,
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  muscle_group  TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('Compound', 'Isolation')),
  equipment     TEXT NOT NULL,
  image_url     TEXT,
  video_url     TEXT
);

CREATE TABLE routines (
  id          INTEGER PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE INDEX routines_user ON routines(user_id);

CREATE TABLE routine_exercises (
  routine_id    INTEGER NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  position      INTEGER NOT NULL,
  exercise_id   INTEGER NOT NULL REFERENCES exercises(id),
  target_sets   INTEGER NOT NULL,
  rep_min       INTEGER NOT NULL,
  rep_max       INTEGER NOT NULL,
  rest_seconds  INTEGER NOT NULL DEFAULT 90,
  PRIMARY KEY (routine_id, position)
);

-- One row per weekday (0 = Monday). NULL routine = rest day.
CREATE TABLE schedule (
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weekday     INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  routine_id  INTEGER REFERENCES routines(id) ON DELETE SET NULL,
  PRIMARY KEY (user_id, weekday)
);

CREATE TABLE workouts (
  id           INTEGER PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  routine_id   INTEGER REFERENCES routines(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  started_at   TEXT NOT NULL,
  finished_at  TEXT
);
CREATE INDEX workouts_user_started ON workouts(user_id, started_at);
-- At most one in-progress workout per user
CREATE UNIQUE INDEX workouts_one_active ON workouts(user_id) WHERE finished_at IS NULL;

-- The plan for a workout, copied from the routine when it starts so later
-- routine edits don't rewrite history
CREATE TABLE workout_exercises (
  workout_id    INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  position      INTEGER NOT NULL,
  exercise_id   INTEGER NOT NULL REFERENCES exercises(id),
  target_sets   INTEGER NOT NULL,
  rep_min       INTEGER NOT NULL,
  rep_max       INTEGER NOT NULL,
  rest_seconds  INTEGER NOT NULL DEFAULT 90,
  PRIMARY KEY (workout_id, position),
  UNIQUE (workout_id, exercise_id)
);

CREATE TABLE workout_sets (
  id           INTEGER PRIMARY KEY,
  workout_id   INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id  INTEGER NOT NULL REFERENCES exercises(id),
  weight_kg    REAL NOT NULL CHECK (weight_kg >= 0),
  reps         INTEGER NOT NULL CHECK (reps > 0),
  rir          INTEGER CHECK (rir BETWEEN 0 AND 10),
  logged_at    TEXT NOT NULL
);
CREATE INDEX workout_sets_workout ON workout_sets(workout_id);
CREATE INDEX workout_sets_exercise ON workout_sets(exercise_id);

-- Daily recovery inputs, keyed by the user's local date (YYYY-MM-DD)
CREATE TABLE recovery_logs (
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date           TEXT NOT NULL,
  sleep_hours    REAL,
  sleep_quality  INTEGER,
  water_ml       INTEGER,
  calories       INTEGER,
  protein_g      INTEGER,
  resting_hr     INTEGER,
  hrv_ms         INTEGER,
  PRIMARY KEY (user_id, date)
);
