export const renderTrendsGrid = () => {
  return `
    <div class="grid grid-2" style="gap: var(--spacing-4);">
      <div class="surface-tertiary p-4 rounded-md js-fade-up">
        <div class="text-xs text-secondary mb-1">Resting HR</div>
        <div class="text-lg font-display text-primary">52 bpm</div>
      </div>
      <div class="surface-tertiary p-4 rounded-md js-fade-up">
        <div class="text-xs text-secondary mb-1">HRV</div>
        <div class="text-lg font-display text-primary">68 ms</div>
      </div>
    </div>
  `;
};
