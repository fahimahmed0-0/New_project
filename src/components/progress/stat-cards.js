export const renderStatCards = () => {
  return `
    <div class="grid grid-4 mb-8" style="gap: var(--spacing-4);">
      <div class="surface-secondary p-4 rounded-lg js-chart-reveal">
        <div class="text-xs text-secondary uppercase tracking-wider mb-2">Total Volume</div>
        <div class="text-xl font-display text-primary flex items-center gap-2">
          124k <span class="text-xs" style="color: var(--accent-secondary);">&uarr; 12%</span>
        </div>
      </div>
      <div class="surface-secondary p-4 rounded-lg js-chart-reveal">
        <div class="text-xs text-secondary uppercase tracking-wider mb-2">Avg 1RM</div>
        <div class="text-xl font-display text-primary flex items-center gap-2">
          +5.2% <span class="text-xs" style="color: var(--accent-secondary);">&uarr;</span>
        </div>
      </div>
      <div class="surface-secondary p-4 rounded-lg js-chart-reveal">
        <div class="text-xs text-secondary uppercase tracking-wider mb-2">PRs This Mo.</div>
        <div class="text-xl font-display text-primary">4</div>
      </div>
      <div class="surface-secondary p-4 rounded-lg js-chart-reveal">
        <div class="text-xs text-secondary uppercase tracking-wider mb-2">Sessions</div>
        <div class="text-xl font-display text-primary">16/20</div>
      </div>
    </div>
  `;
};
