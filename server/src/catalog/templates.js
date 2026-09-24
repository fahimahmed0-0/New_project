// Ready-made training plans shown under "Discover" on the Routines screen.
// Exercises are referenced by catalog slug: [slug, sets, repMin, repMax, restSeconds].
// `schedule` maps weekday (0 = Monday) to an index into `routines`, or null for rest.

export const templates = [
  {
    id: 'ppl',
    name: 'PPL Split',
    description: 'Push, pull and legs, each trained twice a week.',
    routines: [
      {
        name: 'Push Day',
        exercises: [
          ['barbell-bench-press', 4, 6, 8, 150],
          ['overhead-press', 3, 8, 10, 120],
          ['incline-dumbbell-press', 3, 8, 12, 90],
          ['lateral-raise', 3, 12, 15, 60],
          ['tricep-pushdown', 3, 10, 12, 60],
        ],
      },
      {
        name: 'Pull Day',
        exercises: [
          ['deadlift', 3, 5, 5, 180],
          ['pull-up', 3, 6, 10, 120],
          ['barbell-row', 3, 8, 10, 120],
          ['face-pull', 3, 12, 15, 60],
          ['barbell-curl', 3, 8, 12, 60],
        ],
      },
      {
        name: 'Leg Day',
        exercises: [
          ['barbell-squat', 4, 6, 8, 180],
          ['romanian-deadlift', 3, 8, 10, 120],
          ['leg-press', 3, 10, 12, 90],
          ['leg-curl', 3, 10, 12, 60],
          ['standing-calf-raise', 4, 10, 15, 60],
        ],
      },
    ],
    schedule: [0, 1, 2, 0, 1, 2, null],
  },
  {
    id: 'arnold',
    name: 'Arnold Split',
    description: 'Chest & back, shoulders & arms, legs — twice a week.',
    routines: [
      {
        name: 'Chest & Back',
        exercises: [
          ['barbell-bench-press', 4, 6, 10, 120],
          ['pull-up', 4, 6, 10, 120],
          ['incline-dumbbell-press', 3, 8, 12, 90],
          ['barbell-row', 3, 8, 10, 90],
          ['cable-fly', 3, 12, 15, 60],
        ],
      },
      {
        name: 'Shoulders & Arms',
        exercises: [
          ['overhead-press', 4, 6, 10, 120],
          ['lateral-raise', 4, 12, 15, 60],
          ['barbell-curl', 3, 8, 12, 60],
          ['skull-crusher', 3, 8, 12, 60],
          ['hammer-curl', 3, 10, 12, 60],
        ],
      },
      {
        name: 'Legs',
        exercises: [
          ['barbell-squat', 4, 6, 10, 180],
          ['romanian-deadlift', 3, 8, 10, 120],
          ['walking-lunge', 3, 10, 12, 90],
          ['leg-extension', 3, 12, 15, 60],
          ['standing-calf-raise', 4, 10, 15, 60],
        ],
      },
    ],
    schedule: [0, 1, 2, 0, 1, 2, null],
  },
  {
    id: 'upper-lower',
    name: 'Upper / Lower',
    description: 'Four days alternating upper and lower body.',
    routines: [
      {
        name: 'Upper Body',
        exercises: [
          ['barbell-bench-press', 4, 6, 8, 150],
          ['barbell-row', 4, 6, 10, 120],
          ['dumbbell-shoulder-press', 3, 8, 12, 90],
          ['lat-pulldown', 3, 10, 12, 90],
          ['dumbbell-curl', 2, 10, 12, 60],
          ['tricep-pushdown', 2, 10, 12, 60],
        ],
      },
      {
        name: 'Lower Body',
        exercises: [
          ['barbell-squat', 4, 6, 8, 180],
          ['romanian-deadlift', 3, 8, 10, 120],
          ['bulgarian-split-squat', 3, 8, 12, 90],
          ['leg-curl', 3, 10, 12, 60],
          ['hanging-leg-raise', 3, 10, 15, 60],
        ],
      },
    ],
    schedule: [0, 1, null, 0, 1, null, null],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Three whole-body sessions a week. Great for beginners.',
    routines: [
      {
        name: 'Full Body A',
        exercises: [
          ['barbell-squat', 3, 5, 8, 150],
          ['barbell-bench-press', 3, 5, 8, 150],
          ['barbell-row', 3, 8, 10, 120],
          ['lateral-raise', 2, 12, 15, 60],
        ],
      },
      {
        name: 'Full Body B',
        exercises: [
          ['deadlift', 3, 5, 5, 180],
          ['overhead-press', 3, 6, 8, 120],
          ['lat-pulldown', 3, 8, 12, 90],
          ['dumbbell-curl', 2, 10, 12, 60],
        ],
      },
    ],
    schedule: [0, null, 1, null, 0, null, null],
  },
];

export const getTemplate = (id) => templates.find((t) => t.id === id);
