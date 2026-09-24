export const renderStrengthSnapshot = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-stagger-card" style="height: 100%;">
      <h3 class="text-xl font-display mb-4">Strength Snapshot</h3>
      <div class="flex-col" style="gap: var(--spacing-4);">
        
        <div class="flex items-center justify-between" style="padding: var(--spacing-3) var(--spacing-4); background: var(--bg-tertiary); border-radius: var(--radius-sm);">
          <span class="text-primary font-medium">Bench</span>
          <div class="flex items-center" style="gap: var(--spacing-2); font-family: var(--font-display);">
            <span class="text-tertiary">60</span>
            <span class="text-tertiary">&rarr;</span>
            <span class="text-secondary">62.5</span>
            <span class="text-secondary">&rarr;</span>
            <span class="text-primary">65</span>
            <span style="color: var(--accent-secondary); margin-left: var(--spacing-2);">&uarr;</span>
          </div>
        </div>

        <div class="flex items-center justify-between" style="padding: var(--spacing-3) var(--spacing-4); background: var(--bg-tertiary); border-radius: var(--radius-sm);">
          <span class="text-primary font-medium">Squat</span>
          <div class="flex items-center" style="gap: var(--spacing-2); font-family: var(--font-display);">
            <span class="text-tertiary">100</span>
            <span class="text-tertiary">&rarr;</span>
            <span class="text-secondary">102.5</span>
            <span class="text-secondary">&rarr;</span>
            <span class="text-primary">105</span>
            <span style="color: var(--accent-secondary); margin-left: var(--spacing-2);">&uarr;</span>
          </div>
        </div>

        <div class="flex items-center justify-between" style="padding: var(--spacing-3) var(--spacing-4); background: var(--bg-tertiary); border-radius: var(--radius-sm);">
          <span class="text-primary font-medium">Deadlift</span>
          <div class="flex items-center" style="gap: var(--spacing-2); font-family: var(--font-display);">
            <span class="text-tertiary">120</span>
            <span class="text-tertiary">&rarr;</span>
            <span class="text-secondary">120</span>
            <span class="text-secondary">&rarr;</span>
            <span class="text-primary">125</span>
            <span style="color: var(--accent-warning); margin-left: var(--spacing-2);">&rarr;</span>
          </div>
        </div>

      </div>
    </div>
  `;
};
