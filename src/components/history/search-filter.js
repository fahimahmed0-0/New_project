export const renderSearchFilter = () => {
  return `
    <div class="flex items-center gap-4 mb-6 js-fade-up">
      <div style="flex-grow: 1; position: relative;">
        <i data-lucide="search" style="position: absolute; left: 12px; top: 12px; color: var(--text-tertiary); width: 16px;"></i>
        <input type="text" class="input-control" placeholder="Search exercises..." style="padding-left: 36px; width: 100%;" />
      </div>
      <button class="btn surface-tertiary" style="height: 40px; padding: 0 16px; border: 1px solid var(--white-10); border-radius: var(--radius-sm); color: var(--text-secondary);">
        <i data-lucide="filter" style="width: 16px;"></i> Filter
      </button>
    </div>
  `;
};
