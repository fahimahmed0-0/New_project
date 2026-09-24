export const render = () => {
  return `
    <div class="page-container" style="background: url('https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop') center/cover no-repeat; height: 100vh; position: relative;">
      
      <!-- Top nav -->
      <div style="position: absolute; top: 0; left: 0; right: 0; padding: var(--spacing-6); display: flex; justify-content: flex-end; z-index: 10;">
        <button class="btn btn-ghost text-sm font-bold text-primary">Skip</button>
      </div>

      <!-- Gradient overlay -->
      <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, var(--bg-primary) 0%, rgba(247, 249, 252, 0.8) 40%, transparent 60%, var(--bg-primary) 90%);"></div>

      <!-- Content -->
      <div style="position: absolute; top: 15%; left: 0; right: 0; padding: 0 var(--spacing-6); text-align: center; z-index: 10;">
        <h1 class="text-5xl font-display font-bold text-primary mb-4" style="line-height: 1.1;">
          Stronger<br>
          <span style="color: var(--accent-primary);">Every Day</span>
        </h1>
        <p class="text-secondary" style="font-size: 15px; padding: 0 var(--spacing-4);">
          Track your workouts, build better habits and reach your goals.
        </p>
      </div>

      <!-- Text on image mock -->
      <div style="position: absolute; top: 55%; right: 20%; transform: rotate(-10deg); z-index: 10;">
        <p style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: rgba(255,255,255,0.8); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
          Progress<br>Lives Here
        </p>
      </div>

      <!-- Bottom controls -->
      <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: var(--spacing-6); background: var(--bg-primary); z-index: 10; display: flex; flex-direction: column; align-items: center;">
        
        <!-- Carousel dots -->
        <div class="flex items-center gap-2 mb-8">
          <div style="width: 24px; height: 6px; border-radius: 3px; background: var(--accent-primary);"></div>
          <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--border-light);"></div>
          <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--border-light);"></div>
        </div>

        <a href="#/" class="btn btn-primary w-full mb-3" style="text-decoration: none;">Get Started</a>
        <button class="btn btn-secondary w-full" style="background: var(--bg-secondary); border: 1px solid var(--accent-secondary); color: var(--accent-primary);">I already have an account</button>
      </div>

    </div>
  `;
};

export const init = () => {
  // Hide mobile nav
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.style.display = 'none';

  return {
    destroy: () => {
      const nav = document.getElementById('mobile-nav');
      if (nav) nav.style.display = 'flex';
    }
  };
};
