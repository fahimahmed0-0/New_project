export const renderExerciseNav = () => {
  return `
    <div class="flex items-center justify-between text-secondary mt-8 p-4 surface-tertiary rounded-lg text-sm font-medium js-fade-up">
      <div class="flex items-center" style="gap: var(--spacing-2); cursor: pointer;">
        <i data-lucide="arrow-left" style="width: 16px;"></i> Incline DB
      </div>
      <div class="text-primary font-bold">Bench Press</div>
      <div class="flex items-center" style="gap: var(--spacing-2); cursor: pointer;">
        Flyes <i data-lucide="arrow-right" style="width: 16px;"></i>
      </div>
    </div>
  `;
};
