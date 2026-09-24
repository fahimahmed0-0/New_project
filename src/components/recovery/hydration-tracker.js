export const renderHydrationTracker = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up text-center flex-col items-center justify-center">
      <h3 class="text-sm font-medium text-secondary uppercase tracking-wider mb-4">Hydration</h3>
      <div style="width: 80px; height: 120px; border: 2px solid var(--white-10); border-radius: 8px 8px 16px 16px; position: relative; overflow: hidden; margin: 0 auto mb-4;">
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 75%; background: var(--accent-secondary); transition: height 1s ease;"></div>
      </div>
      <div class="text-2xl font-display text-primary">2.4L <span class="text-sm text-secondary">/ 3.2L</span></div>
    </div>
  `;
};
