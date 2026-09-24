export const renderPlateauDetector = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up border-warning">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-2xl font-display text-primary flex items-center gap-2">
            <i data-lucide="alert-triangle" style="color: var(--accent-warning);"></i>
            Plateau Warning
          </h2>
          <p class="text-sm text-secondary">2 exercises showing plateau signals</p>
        </div>
      </div>
      <div class="grid grid-2" style="gap: var(--spacing-4);">
        <div class="surface-tertiary p-4 rounded-md">
          <div class="text-primary font-bold">Overhead Press</div>
          <div class="text-sm text-secondary">Stalled: 3 weeks</div>
          <div class="text-xs text-tertiary mt-2">Last progress: Sep 1</div>
        </div>
        <div class="surface-tertiary p-4 rounded-md">
          <div class="text-primary font-bold">Barbell Row</div>
          <div class="text-sm text-secondary">Stalled: 4 weeks</div>
          <div class="text-xs text-tertiary mt-2">Last progress: Aug 25</div>
        </div>
      </div>
    </div>
  `;
};
