export const renderWeightComparison = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <div class="grid grid-4 text-center">
        <div>
          <div class="text-xs text-secondary uppercase tracking-wider mb-2">Previous</div>
          <div class="text-xl font-display text-primary">60 kg</div>
          <div class="text-sm text-tertiary">&times; 10</div>
        </div>
        <div>
          <div class="text-xs text-secondary uppercase tracking-wider mb-2">Current</div>
          <div class="text-xl font-display text-primary">62.5 kg</div>
          <div class="text-sm text-tertiary">&times; 10</div>
        </div>
        <div>
          <div class="text-xs text-secondary uppercase tracking-wider mb-2">Target</div>
          <div class="text-xl font-display text-primary">65 kg</div>
          <div class="text-sm text-tertiary">&times; 8-10</div>
        </div>
        <div class="flex-col justify-center">
          <div class="text-xs text-secondary uppercase tracking-wider mb-2">Status</div>
          <div class="badge text-xs" style="background: rgba(6, 214, 160, 0.15); color: var(--accent-secondary); padding: 4px 8px; border-radius: 4px;">PROGRESSING &uarr;</div>
        </div>
      </div>
    </div>
  `;
};
