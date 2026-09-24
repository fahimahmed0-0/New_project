import { renderWorkoutCard } from './workout-card.js';
import { workoutHistory } from '../../data/mock-data.js';

export const renderWorkoutList = () => {
  let listHtml = '';
  // Reverse to show newest first
  const history = [...workoutHistory].reverse();
  
  history.forEach((session, i) => {
    // Generate dummy names and PRs for display
    const sessionObj = {
      name: i % 2 === 0 ? 'Push Day A' : 'Pull Day B',
      date: session.date,
      prs: i % 3 === 0 ? 2 : 0,
      exercises: session.exercises.map(e => ({ name: 'Exercise' }))
    };
    listHtml += renderWorkoutCard(sessionObj);
  });

  return `
    <div class="flex-col">
      ${listHtml}
    </div>
  `;
};
