export const renderCompletionModal = () => {
  return `
    <!-- Modal Backdrop -->
    <div id="modal-backdrop" style="display: none; position: fixed; inset: 0; background: rgba(10,10,15,0.8); backdrop-filter: blur(4px); z-index: var(--z-backdrop);"></div>

    <!-- Completion Modal (Hidden by default) -->
    <div id="completion-modal" class="surface-glass flex-col items-center justify-center text-center" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: var(--z-modal); width: 90%; max-width: 400px; border: 1px solid var(--accent-primary); padding: var(--spacing-8);">
      <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background: var(--accent-primary-gradient); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-6); box-shadow: var(--shadow-lg);">
        <i data-lucide="trophy" style="width: 32px; height: 32px; color: #fff;"></i>
      </div>
      <h2 class="text-3xl font-display text-primary mb-2">Workout Complete!</h2>
      <p class="text-secondary mb-6">Incredible effort. You hit 2 new personal records today.</p>
      
      <div class="grid grid-2 w-full mb-8" style="gap: var(--spacing-4);">
        <div class="surface-tertiary p-4 rounded-md">
          <div class="text-xs text-secondary uppercase tracking-wider mb-1">Volume</div>
          <div class="text-xl font-display text-primary">12,450 kg</div>
        </div>
        <div class="surface-tertiary p-4 rounded-md">
          <div class="text-xs text-secondary uppercase tracking-wider mb-1">Duration</div>
          <div class="text-xl font-display text-primary">1h 12m</div>
        </div>
      </div>
      
      <a href="#/progress" class="btn btn-primary w-full magnetic-btn" style="text-decoration: none;">VIEW PROGRESS</a>
    </div>
  `;
};
