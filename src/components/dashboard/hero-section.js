export const renderHeroSection = (user) => {
  return `
    <div class="hero-section js-fade-up" style="position: relative; overflow: hidden; border-radius: var(--radius-xl); padding: var(--spacing-8); margin-bottom: var(--spacing-8); background: linear-gradient(145deg, var(--bg-elevated) 0%, var(--bg-secondary) 100%); border: 1px solid var(--white-5);">
      <div style="position: relative; z-index: 1;">
        <span class="badge text-xs" style="background: rgba(108, 99, 255, 0.2); color: var(--accent-primary); padding: 4px 12px; border-radius: var(--radius-full); margin-bottom: var(--spacing-4); display: inline-block;">Training Status: Optimal</span>
        <h2 class="text-5xl font-display text-primary mb-2">Week 12 &middot; ${user.split}</h2>
        <p class="text-secondary text-lg">Pushing boundaries today, ${user.name.split(' ')[0]}.</p>
      </div>
      <div id="hero-3d-container" style="position: absolute; top: 0; right: 0; width: 60%; height: 100%; z-index: 0; pointer-events: none;"></div>
    </div>
  `;
};
