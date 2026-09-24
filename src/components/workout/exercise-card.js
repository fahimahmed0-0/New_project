import { renderSetRow } from './set-row.js';
import { renderPreviousPerformance } from './previous-performance.js';
import { renderTargetIndicator } from './target-indicator.js';

export const renderExerciseCard = (exercise, index) => {
  // Mock history resolution
  let historyStr = "60 kg &times; 10, 10, 8";
  let targetStr = "62.5 kg &times; 8-10";
  let targetWeight = 62.5;

  let setsHtml = '';
  const numSets = typeof exercise.sets === 'number' ? exercise.sets : exercise.sets.length || 4;
  for (let sIdx = 0; sIdx < numSets; sIdx++) {
    const dummySet = { reps: typeof exercise.reps === 'string' ? exercise.reps.split('-')[0] : 10 };
    setsHtml += renderSetRow(dummySet, sIdx, targetWeight);
  }

  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <div class="flex items-start justify-between" style="margin-bottom: var(--spacing-6);">
        <div>
          <h2 class="text-2xl font-display text-primary mb-1">${exercise.name || 'Bench Press'}</h2>
          ${renderPreviousPerformance(historyStr)}
          ${renderTargetIndicator(targetStr)}
        </div>
      </div>
      
      <div class="w-full">
        <div class="flex items-center justify-between text-xs text-tertiary font-medium uppercase tracking-wider" style="padding-bottom: var(--spacing-2); border-bottom: 1px solid var(--white-10);">
          <div style="width: 32px;">Set</div>
          <div class="text-center" style="width: 64px;">Prev</div>
          <div class="text-center" style="width: var(--input-workout-width);">kg</div>
          <div class="text-center" style="width: var(--input-workout-width);">Reps</div>
          <div class="text-center flex items-center justify-end" style="width: 32px;"><i data-lucide="check" style="width: 14px;"></i></div>
        </div>
        
        <div class="flex-col mt-2">
          ${setsHtml}
        </div>
      </div>
    </div>
  `;
};
