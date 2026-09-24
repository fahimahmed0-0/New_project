export const renderFactorsList = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">Possible Factors</h3>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--spacing-3);">
        <li class="flex items-center gap-3">
          <span style="color: var(--accent-danger);">&bull;</span>
          <span class="text-primary">Sleep avg 6.2h (below 7h target)</span>
          <span class="badge text-xs ml-auto" style="background: rgba(255, 107, 107, 0.2); color: var(--accent-danger);">HIGH IMPACT</span>
        </li>
        <li class="flex items-center gap-3">
          <span style="color: var(--accent-warning);">&bull;</span>
          <span class="text-primary">Calories avg 2,100 (target 2,500)</span>
          <span class="badge text-xs ml-auto" style="background: rgba(255, 184, 77, 0.2); color: var(--accent-warning);">MEDIUM IMPACT</span>
        </li>
        <li class="flex items-center gap-3">
          <span style="color: var(--accent-warning);">&bull;</span>
          <span class="text-primary">No deload in 8 weeks</span>
          <span class="badge text-xs ml-auto" style="background: rgba(255, 184, 77, 0.2); color: var(--accent-warning);">MEDIUM IMPACT</span>
        </li>
        <li class="flex items-center gap-3">
          <span style="color: var(--accent-secondary);">&bull;</span>
          <span class="text-primary text-secondary">Hydration OK (2.6L avg)</span>
          <span class="badge text-xs ml-auto" style="background: rgba(6, 214, 160, 0.2); color: var(--accent-secondary);">LOW IMPACT</span>
        </li>
      </ul>
    </div>
  `;
};
