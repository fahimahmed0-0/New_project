export const user = {
  name: 'Alex',
  age: 28,
  weight: 82.5,
  height: 180,
  trainingAge: 3,
  split: 'Push/Pull/Legs'
};

export const todayWorkout = {
  id: 'w_001',
  name: 'Push Day A',
  day: 'Monday',
  week: 12,
  status: 'planned',
  exercises: [
    { id: 'ex_001', sets: 4, reps: '8-10' },
    { id: 'ex_002', sets: 3, reps: '10-12' },
    { id: 'ex_007', sets: 3, reps: '8-10' },
    { id: 'ex_003', sets: 3, reps: '12-15' },
    { id: 'ex_012', sets: 4, reps: '12-15' }
  ]
};

export const targets = {
  'ex_001': { currentWeight: 62.5, nextTarget: 65, status: 'up' },
  'ex_004': { currentWeight: 102.5, nextTarget: 105, status: 'up' },
  'ex_005': { currentWeight: 120, nextTarget: 125, status: 'flat' },
  'ex_007': { currentWeight: 50, nextTarget: 50, status: 'down' }
};

export const weeklyAdherence = {
  completed: 5,
  planned: 6,
  history: [true, true, false, true, true, true, null]
};

export const vitals = {
  calories: { current: 2340, target: 2800 },
  water: { current: 2.8, target: 3.5 },
  sleep: { current: 7.2, target: 8.0 }
};

export const aiInsight = "Your bench press has increased 8% over the last 4 weeks. Squat volume is trending down — consider adding an extra set on leg days.";

export const personalRecords = {
  'ex_001': { weight: 82.5, reps: 1, estimated1RM: 82.5, date: '2026-09-15' },
  'ex_004': { weight: 135, reps: 1, estimated1RM: 135, date: '2026-09-10' },
  'ex_005': { weight: 170, reps: 1, estimated1RM: 170, date: '2026-08-28' }
};

export const plateauData = {
  'ex_007': { isPlateauing: true, weeksSinceProgress: 3, factors: ['sleep', 'calories'] },
  'ex_009': { isPlateauing: true, weeksSinceProgress: 4, factors: ['deload'] }
};

// Generates 90 days of realistic past workouts
const generateHistory = () => {
  const history = [];
  const now = new Date('2026-09-21T12:00:00Z').getTime(); // Use fixed date for consistent mock data
  const dayMs = 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < 90; i++) {
    // Workout 4 days a week on average
    if (Math.random() > 0.4) {
      history.push({
        id: `hist_${i}`,
        date: new Date(now - (i * dayMs)).toISOString(),
        name: ['Push Day', 'Pull Day', 'Leg Day'][i % 3],
        exercises: [
          {
            exerciseId: 'ex_001',
            sets: [
              { weight: 60, reps: 10, rir: 2, ispr: false },
              { weight: 60, reps: 10, rir: 1, ispr: false },
              { weight: 60, reps: 9, rir: 0, ispr: false }
            ]
          }
        ]
      });
    }
  }
  return history;
};

export const workoutHistory = generateHistory();

// Generates 30 days of recovery vitals
const generateRecovery = () => {
  const recovery = [];
  const now = new Date('2026-09-21T12:00:00Z').getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  
  for (let i = 0; i < 30; i++) {
    recovery.push({
      date: new Date(now - (i * dayMs)).toISOString(),
      sleep: { hours: (Math.random() * 2 + 6).toFixed(1), quality: Math.floor(Math.random() * 40 + 60) },
      water: { ml: Math.floor(Math.random() * 1500 + 1500) },
      calories: Math.floor(Math.random() * 500 + 2200),
      protein: Math.floor(Math.random() * 40 + 140)
    });
  }
  return recovery;
};

export const recoveryData = generateRecovery();

export const weeklySplit = {
  Mon: 'Chest + Triceps',
  Tue: 'Back + Biceps',
  Wed: 'Rest',
  Thu: 'Legs',
  Fri: 'Shoulders',
  Sat: 'Cardio',
  Sun: 'Rest'
};
