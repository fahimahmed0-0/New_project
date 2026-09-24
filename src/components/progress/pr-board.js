export const renderPrBoard = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-chart-reveal">
      <h3 class="text-lg font-display mb-4">Recent PRs</h3>
      <div class="flex-col" style="gap: var(--spacing-3);">
        <div class="flex items-center justify-between p-3 rounded-md" style="background: var(--bg-tertiary); border-left: 3px solid var(--accent-primary);">
          <div>
            <div class="text-primary font-medium">Bench Press</div>
            <div class="text-xs text-secondary mt-1">Sep 15</div>
          </div>
          <div class="text-lg font-display text-primary">82.5 kg</div>
        </div>
        <div class="flex items-center justify-between p-3 rounded-md" style="background: var(--bg-tertiary); border-left: 3px solid var(--accent-primary);">
          <div>
            <div class="text-primary font-medium">Squat</div>
            <div class="text-xs text-secondary mt-1">Sep 10</div>
          </div>
          <div class="text-lg font-display text-primary">135 kg</div>
        </div>
      </div>
    </div>
  `;
};
