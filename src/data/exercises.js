export const exercises = [
  { id: 'ex_001', name: 'Barbell Bench Press', muscleGroup: 'Chest', category: 'Compound', unit: 'kg' },
  { id: 'ex_002', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', category: 'Compound', unit: 'kg' },
  { id: 'ex_003', name: 'Cable Flyes', muscleGroup: 'Chest', category: 'Isolation', unit: 'kg' },
  { id: 'ex_004', name: 'Barbell Squat', muscleGroup: 'Legs', category: 'Compound', unit: 'kg' },
  { id: 'ex_005', name: 'Romanian Deadlift', muscleGroup: 'Legs', category: 'Compound', unit: 'kg' },
  { id: 'ex_006', name: 'Leg Extension', muscleGroup: 'Legs', category: 'Isolation', unit: 'kg' },
  { id: 'ex_007', name: 'Overhead Press', muscleGroup: 'Shoulders', category: 'Compound', unit: 'kg' },
  { id: 'ex_008', name: 'Lateral Raises', muscleGroup: 'Shoulders', category: 'Isolation', unit: 'kg' },
  { id: 'ex_009', name: 'Barbell Row', muscleGroup: 'Back', category: 'Compound', unit: 'kg' },
  { id: 'ex_010', name: 'Lat Pulldown', muscleGroup: 'Back', category: 'Compound', unit: 'kg' },
  { id: 'ex_011', name: 'Bicep Curl', muscleGroup: 'Arms', category: 'Isolation', unit: 'kg' },
  { id: 'ex_012', name: 'Tricep Extension', muscleGroup: 'Arms', category: 'Isolation', unit: 'kg' }
];

export const getExerciseById = (id) => exercises.find(ex => ex.id === id);
