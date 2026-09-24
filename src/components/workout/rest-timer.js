export const renderRestTimer = () => {
  return `
    <div class="surface-secondary p-4 rounded-lg flex items-center justify-between mt-4 js-fade-up">
      <div class="flex items-center" style="gap: var(--spacing-3);">
        <i data-lucide="timer" style="color: var(--accent-secondary);"></i>
        <span class="text-primary font-medium" id="rest-timer-display">00:00</span>
      </div>
      <div class="flex items-center" style="gap: var(--spacing-2);">
        <button class="btn btn-ghost text-xs" style="padding: 4px 8px;">+30s</button>
        <button class="btn btn-ghost text-xs" style="padding: 4px 8px; color: var(--accent-danger);">SKIP</button>
      </div>
    </div>
  `;
};
