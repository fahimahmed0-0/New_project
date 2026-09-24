export const render = () => {
  return `
    <div class="page-content js-fade-up text-center flex-col h-full" style="padding-bottom: 24px; min-height: 100%;">
      
      <!-- Close Header -->
      <header class="flex items-center justify-between mb-2">
        <a href="#/" class="text-primary" style="text-decoration: none;">
          <i data-lucide="x" style="width: 24px;"></i>
        </a>
      </header>

      <!-- Trophy & Title -->
      <div class="flex-col items-center justify-center mb-6">
        <div style="font-size: 64px; margin-bottom: 16px;">🏆</div>
        <h1 class="text-2xl font-bold text-primary mb-1">Workout Completed!</h1>
        <p class="text-secondary text-sm">Great job! Keep showing up.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-2 gap-4 mb-8">
        <div class="surface-secondary p-4 flex-col items-center justify-center text-center">
          <i data-lucide="clock" class="mb-2" style="color: var(--accent-primary); width: 20px;"></i>
          <div class="text-xl font-bold text-primary mb-1">1:05:23</div>
          <div class="text-xs text-secondary">Duration</div>
        </div>
        <div class="surface-secondary p-4 flex-col items-center justify-center text-center">
          <i data-lucide="clipboard-list" class="mb-2" style="color: var(--accent-primary); width: 20px;"></i>
          <div class="text-xl font-bold text-primary mb-1">7</div>
          <div class="text-xs text-secondary">Exercises</div>
        </div>
        <div class="surface-secondary p-4 flex-col items-center justify-center text-center">
          <i data-lucide="layers" class="mb-2" style="color: var(--accent-primary); width: 20px;"></i>
          <div class="text-xl font-bold text-primary mb-1">18</div>
          <div class="text-xs text-secondary">Total Sets</div>
        </div>
        <div class="surface-secondary p-4 flex-col items-center justify-center text-center">
          <i data-lucide="dumbbell" class="mb-2" style="color: var(--accent-primary); width: 20px;"></i>
          <div class="text-xl font-bold text-primary mb-1">9,450 kg</div>
          <div class="text-xs text-secondary">Total Volume</div>
        </div>
      </div>

      <!-- Muscle Groups -->
      <div class="text-left mb-auto">
        <h2 class="text-base font-bold text-primary mb-4">Muscle Groups</h2>
        <div class="flex items-center gap-6">
          <div style="flex-shrink: 0; width: 120px; height: 120px; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Muscles_anterior_labeled.svg/1024px-Muscles_anterior_labeled.svg.png') center/contain no-repeat; filter: grayscale(1) contrast(0.5) brightness(1.5);">
            <!-- Placeholder for anatomy SVG -->
          </div>
          <div class="flex-col w-full gap-3">
            
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary);"></div>
                <span class="text-primary font-medium">Chest</span>
              </div>
              <span class="text-secondary">32%</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3B82F6;"></div>
                <span class="text-primary font-medium">Shoulders</span>
              </div>
              <span class="text-secondary">24%</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #60A5FA;"></div>
                <span class="text-primary font-medium">Triceps</span>
              </div>
              <span class="text-secondary">18%</span>
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #9CA3AF;"></div>
                <span class="text-primary font-medium">Others</span>
              </div>
              <span class="text-secondary">26%</span>
            </div>

          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="mt-8 flex-col gap-3">
        <button class="btn btn-secondary w-full" style="font-weight: 600;">Share Workout</button>
        <a href="#/" class="btn btn-primary w-full" style="text-decoration: none;">Done</a>
      </div>

    </div>
  `;
};

export const init = () => {
  if (window.lucide) window.lucide.createIcons();
  
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
