import { addDays, daysBetween, weekdayOf } from './dates.js';

export const round1 = (n) => Math.round(n * 10) / 10;
const roundToPlate = (kg) => Math.round(kg / 2.5) * 2.5;
const clamp01 = (n) => Math.min(1, Math.max(0, n));
const sum = (values) => values.reduce((a, b) => a + b, 0);

// Brzycki formula. Reps are clamped at 12 because the estimate overshoots badly beyond that.
export const estimateOneRepMax = (weightKg, reps) => {
  if (!(weightKg > 0) || !(reps > 0)) return 0;
  const r = Math.min(reps, 12);
  return round1(r === 1 ? weightKg : (weightKg * 36) / (37 - r));
};

export const setVolume = (set) => set.weight_kg * set.reps;

// `sets` must be chronological with each workout's sets contiguous. A workout sets a PR for an
// exercise when its best estimated 1RM beats every earlier workout's; the first time an
// exercise is ever logged doesn't count. Returns Map<workout_id, PR[]>, one PR per exercise.
export const findWorkoutPrs = (sets) => {
  const allTimeBest = new Map();
  const result = new Map();
  let workoutId = null;
  let workoutBest = new Map();

  const flush = () => {
    const prs = [];
    for (const [exerciseId, best] of workoutBest) {
      const previous = allTimeBest.get(exerciseId);
      if (previous !== undefined && best.e1rm > previous) prs.push(best);
      if (previous === undefined || best.e1rm > previous) allTimeBest.set(exerciseId, best.e1rm);
    }
    if (prs.length) result.set(workoutId, prs);
  };

  for (const s of sets) {
    if (s.workout_id !== workoutId) {
      if (workoutId !== null) flush();
      workoutId = s.workout_id;
      workoutBest = new Map();
    }
    const e1rm = estimateOneRepMax(s.weight_kg, s.reps);
    const current = workoutBest.get(s.exercise_id);
    if (!current || e1rm > current.e1rm) {
      workoutBest.set(s.exercise_id, {
        exercise_id: s.exercise_id, set_id: s.id, weight_kg: s.weight_kg, reps: s.reps, e1rm,
      });
    }
  }
  if (workoutId !== null) flush();
  return result;
};

const progressionIncrement = (exercise) =>
  exercise.category === 'Compound' && exercise.muscle_group === 'Legs' ? 5 : 2.5;

// Double progression: once every top set reaches the top of the rep range, add weight.
// If every top set fell short of the bottom of the range, back off ~10%.
export const suggestNextTarget = ({ lastSets, repMin, repMax, exercise }) => {
  if (!lastSets?.length) return null;
  const top = Math.max(...lastSets.map((s) => s.weight_kg));
  const topSets = lastSets.filter((s) => s.weight_kg === top);
  const range = { rep_min: repMin, rep_max: repMax };

  if (topSets.every((s) => s.reps >= repMax)) {
    return { ...range, weight_kg: top + progressionIncrement(exercise), status: 'up' };
  }
  if (top > 0 && topSets.every((s) => s.reps < repMin)) {
    return { ...range, weight_kg: roundToPlate(top * 0.9), status: 'down' };
  }
  return { ...range, weight_kg: top, status: 'hold' };
};

// Consecutive days, counting back from today, on which the user either trained or had a
// planned rest day. Today only extends the streak (it isn't over yet), it never breaks it.
export const computeStreak = ({ workoutDates, schedule, today }) => {
  if (!workoutDates.size) return 0;
  const firstWorkout = [...workoutDates].sort()[0];
  const hasTrainingDays = schedule.some((routineId) => routineId != null);
  const counts = (day) => workoutDates.has(day) || (hasTrainingDays && schedule[weekdayOf(day)] == null);

  let streak = counts(today) ? 1 : 0;
  for (let day = addDays(today, -1); day >= firstWorkout; day = addDays(day, -1)) {
    if (!counts(day)) break;
    streak += 1;
  }
  return streak;
};

export const PLATEAU_WEEKS = 3;

// `sessions`: chronological [{ date, e1rm }] for one exercise
export const progressStatus = (sessions, today) => {
  if (!sessions.length) return { status: 'new', best_e1rm: null, last_progress_date: null, weeks_since_progress: null };

  let best = -Infinity;
  let lastProgressDate = null;
  for (const s of sessions) {
    if (s.e1rm > best) {
      best = s.e1rm;
      lastProgressDate = s.date;
    }
  }
  const weeks = Math.floor(daysBetween(lastProgressDate, today) / 7);
  const sessionsSince = sessions.filter((s) => s.date > lastProgressDate).length;
  const stillTrained = daysBetween(sessions.at(-1).date, today) <= 21;

  let status = 'progressing';
  if (sessions.length < 4) status = 'new';
  else if (weeks >= PLATEAU_WEEKS && sessionsSince >= 2 && stillTrained) status = 'stalled';
  else if (weeks >= PLATEAU_WEEKS) status = 'inactive';

  return { status, best_e1rm: best, last_progress_date: lastProgressDate, weeks_since_progress: weeks };
};

// `weeklyVolumes`: consecutive complete weeks, oldest first. A deload week is one whose
// volume drops below 60% of the average of the four weeks before it (a week off counts).
// Returns how many weeks ago the most recent deload was, or null if none is found.
export const weeksSinceDeload = (weeklyVolumes) => {
  for (let i = weeklyVolumes.length - 1; i >= 4; i -= 1) {
    const mean = sum(weeklyVolumes.slice(i - 4, i)) / 4;
    if (mean > 0 && weeklyVolumes[i] < 0.6 * mean) return weeklyVolumes.length - 1 - i;
  }
  return null;
};

// 0–100 blend of last night's sleep, hydration, nutrition and recent training load.
// Components without data are left out and the remaining weights rescaled.
export const computeRecoveryScore = ({ log, targets, loadRatio }) => {
  const parts = [];
  if (log?.sleep_hours != null) {
    parts.push({ key: 'sleep', weight: 40, value: clamp01(log.sleep_hours / targets.sleep_target_hours) });
  }
  if (log?.sleep_quality != null) {
    parts.push({ key: 'sleep_quality', weight: 20, value: clamp01(log.sleep_quality / 100) });
  }
  if (log?.water_ml != null) {
    parts.push({ key: 'hydration', weight: 15, value: clamp01(log.water_ml / targets.water_target_ml) });
  }
  const nutrition = [
    log?.calories != null ? clamp01(log.calories / targets.calorie_target) : null,
    log?.protein_g != null ? clamp01(log.protein_g / targets.protein_target_g) : null,
  ].filter((v) => v != null);
  if (nutrition.length) parts.push({ key: 'nutrition', weight: 15, value: sum(nutrition) / nutrition.length });

  // Training load alone says nothing about recovery, so require at least one logged input
  if (!parts.length) return null;
  if (loadRatio != null) {
    parts.push({ key: 'training_load', weight: 10, value: loadRatio <= 1 ? 1 : clamp01(2 - loadRatio) });
  }

  const totalWeight = sum(parts.map((p) => p.weight));
  const score = Math.round((sum(parts.map((p) => p.weight * p.value)) / totalWeight) * 100);
  let label = 'Consider a lighter session or a rest day.';
  if (score >= 80) label = 'Primed for a heavy session.';
  else if (score >= 60) label = 'Good to train — keep intensity moderate.';

  return { score, label, components: parts.map(({ key, value }) => ({ key, value: round1(value * 100) })) };
};
