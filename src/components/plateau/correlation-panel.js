export const renderCorrelationPanel = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">Lifestyle Correlation</h3>
      <div class="flex-col" style="gap: var(--spacing-4);">
        <div class="flex items-center justify-between">
          <span class="text-secondary">Sleep Avg</span>
          <span class="text-primary">6.2h <span class="text-xs" style="color: var(--accent-danger);">&darr; Target 7h</span></span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-secondary">Calories</span>
          <span class="text-primary">2100 <span class="text-xs" style="color: var(--accent-warning);">&darr; Target 2500</span></span>
        </div>
      </div>
    </div>
  `;
};
