export const renderHistoryTable = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">History</h3>
      <div class="flex-col" style="gap: var(--spacing-2);">
        <div class="flex items-center justify-between p-3 rounded-md surface-tertiary">
          <div class="text-secondary font-medium">Sep 18</div>
          <div class="text-primary">62.5&times;10, 62.5&times;9, 62.5&times;8</div>
        </div>
        <div class="flex items-center justify-between p-3 rounded-md surface-tertiary">
          <div class="text-secondary font-medium">Sep 14</div>
          <div class="text-primary">60&times;10, 60&times;10, 60&times;8</div>
        </div>
        <div class="flex items-center justify-between p-3 rounded-md surface-tertiary">
          <div class="text-secondary font-medium">Sep 10</div>
          <div class="text-primary">60&times;10, 60&times;9, 60&times;8</div>
        </div>
      </div>
    </div>
  `;
};
