export const renderNutritionOverview = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-sm font-medium text-secondary uppercase tracking-wider mb-4">Nutrition</h3>
      <div class="flex-col" style="gap: var(--spacing-4);">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-primary">Calories</span>
            <span class="text-secondary">2,340 / 2,500 kcal</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--white-10); border-radius: 3px; overflow: hidden;">
            <div style="width: 90%; height: 100%; background: var(--accent-primary);"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-primary">Protein</span>
            <span class="text-secondary">165g / 180g</span>
          </div>
          <div style="width: 100%; height: 6px; background: var(--white-10); border-radius: 3px; overflow: hidden;">
            <div style="width: 85%; height: 100%; background: var(--accent-secondary);"></div>
          </div>
        </div>
      </div>
    </div>
  `;
};
