import { renderPrBadge } from './pr-badges.js';

export const renderWorkoutCard = (workout) => {
  return `
    <div class="surface-secondary p-5 rounded-lg mb-4 cursor-pointer js-fade-up transition-all hover-lift" style="border: 1px solid transparent;">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-primary font-bold">${workout.name}</h3>
        <span class="text-secondary text-sm">${new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
      <div class="flex items-center gap-4 text-sm text-tertiary mb-4">
        <span class="flex items-center gap-1"><i data-lucide="clock" style="width: 14px;"></i> 1h 12m</span>
        <span class="flex items-center gap-1"><i data-lucide="activity" style="width: 14px;"></i> 12.4k kg</span>
        ${renderPrBadge(workout.prs || 0)}
      </div>
      <div class="text-secondary text-sm line-clamp-1">
        ${workout.exercises.map(e => e.name).join(', ')}
      </div>
    </div>
  `;
};
