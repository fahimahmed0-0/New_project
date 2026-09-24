// Built-in exercise catalog. Synced into the `exercises` table on startup by slug,
// so editing a name here updates existing rows without breaking logged sets.

const images = {
  Chest: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200',
  Back: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=200',
  Shoulders: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200',
  Legs: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=200',
  Arms: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200',
  Core: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200',
};

const list = [
  // Chest
  ['barbell-bench-press', 'Barbell Bench Press', 'Chest', 'Compound', 'Barbell'],
  ['incline-dumbbell-press', 'Incline Dumbbell Press', 'Chest', 'Compound', 'Dumbbell'],
  ['dumbbell-bench-press', 'Dumbbell Bench Press', 'Chest', 'Compound', 'Dumbbell'],
  ['cable-fly', 'Cable Fly', 'Chest', 'Isolation', 'Cable'],
  ['machine-chest-fly', 'Chest Fly (Machine)', 'Chest', 'Isolation', 'Machine'],
  ['push-up', 'Push Up', 'Chest', 'Compound', 'Bodyweight'],
  ['dips', 'Dips', 'Chest', 'Compound', 'Bodyweight'],
  // Back
  ['deadlift', 'Deadlift', 'Back', 'Compound', 'Barbell'],
  ['barbell-row', 'Barbell Row', 'Back', 'Compound', 'Barbell'],
  ['pull-up', 'Pull Up', 'Back', 'Compound', 'Bodyweight'],
  ['lat-pulldown', 'Lat Pulldown', 'Back', 'Compound', 'Cable'],
  ['seated-cable-row', 'Seated Cable Row', 'Back', 'Compound', 'Cable'],
  ['dumbbell-row', 'Dumbbell Row', 'Back', 'Compound', 'Dumbbell'],
  // Shoulders
  ['overhead-press', 'Overhead Press', 'Shoulders', 'Compound', 'Barbell'],
  ['dumbbell-shoulder-press', 'Dumbbell Shoulder Press', 'Shoulders', 'Compound', 'Dumbbell'],
  ['lateral-raise', 'Lateral Raise', 'Shoulders', 'Isolation', 'Dumbbell'],
  ['rear-delt-fly', 'Rear Delt Fly', 'Shoulders', 'Isolation', 'Dumbbell'],
  ['face-pull', 'Face Pull', 'Shoulders', 'Isolation', 'Cable'],
  // Legs
  ['barbell-squat', 'Barbell Squat', 'Legs', 'Compound', 'Barbell'],
  ['romanian-deadlift', 'Romanian Deadlift', 'Legs', 'Compound', 'Barbell'],
  ['leg-press', 'Leg Press', 'Legs', 'Compound', 'Machine'],
  ['bulgarian-split-squat', 'Bulgarian Split Squat', 'Legs', 'Compound', 'Dumbbell'],
  ['walking-lunge', 'Walking Lunge', 'Legs', 'Compound', 'Dumbbell'],
  ['hip-thrust', 'Hip Thrust', 'Legs', 'Compound', 'Barbell'],
  ['leg-extension', 'Leg Extension', 'Legs', 'Isolation', 'Machine'],
  ['leg-curl', 'Leg Curl', 'Legs', 'Isolation', 'Machine'],
  ['standing-calf-raise', 'Standing Calf Raise', 'Legs', 'Isolation', 'Machine'],
  // Arms
  ['barbell-curl', 'Barbell Curl', 'Arms', 'Isolation', 'Barbell'],
  ['dumbbell-curl', 'Dumbbell Curl', 'Arms', 'Isolation', 'Dumbbell'],
  ['hammer-curl', 'Hammer Curl', 'Arms', 'Isolation', 'Dumbbell'],
  ['tricep-pushdown', 'Tricep Pushdown', 'Arms', 'Isolation', 'Cable'],
  ['overhead-tricep-extension', 'Overhead Tricep Extension', 'Arms', 'Isolation', 'Cable'],
  ['skull-crusher', 'Skull Crusher', 'Arms', 'Isolation', 'Barbell'],
  ['close-grip-bench-press', 'Close-Grip Bench Press', 'Arms', 'Compound', 'Barbell'],
  // Core
  ['hanging-leg-raise', 'Hanging Leg Raise', 'Core', 'Isolation', 'Bodyweight'],
  ['cable-crunch', 'Cable Crunch', 'Core', 'Isolation', 'Cable'],
  ['ab-wheel-rollout', 'Ab Wheel Rollout', 'Core', 'Isolation', 'Bodyweight'],
];

export const MUSCLE_GROUPS = ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];

export const exerciseCatalog = list.map(([slug, name, muscleGroup, category, equipment]) => ({
  slug,
  name,
  muscleGroup,
  category,
  equipment,
  imageUrl: images[muscleGroup],
  videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} proper form`)}`,
}));
