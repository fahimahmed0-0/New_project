import { user, workoutHistory, todayWorkout, weeklySplit } from '../data/mock-data.js';

let isEditingSplit = false;

export const render = () => {
  const totalWorkouts = workoutHistory.length;
  const currentMonth = new Date().getMonth();
  const thisMonthWorkouts = workoutHistory.filter(w => new Date(w.date).getMonth() === currentMonth).length;
  const streak = 4;

  return `
    <div class="page-content js-fade-up">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <div>
          <p class="text-sm text-secondary mb-1">Good Evening,</p>
          <h1 class="text-2xl font-bold text-primary">${user.name} 👋</h1>
        </div>
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: var(--border-light); overflow: hidden;">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
      </header>

      <!-- Stats Horizontal Scroll -->
      <div style="display: flex; gap: var(--spacing-4); overflow-x: auto; padding-bottom: var(--spacing-4); margin-right: calc(var(--spacing-6) * -1); padding-right: var(--spacing-6); scrollbar-width: none;">
        
        <div class="surface-secondary p-4 flex-col justify-between" style="min-width: 110px; flex-shrink: 0;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-3);">
            <i data-lucide="calendar" style="width: 16px; color: var(--accent-primary);"></i>
          </div>
          <div>
            <div class="text-xl font-bold text-primary mb-1">${totalWorkouts}</div>
            <div class="text-xs text-secondary">Workouts</div>
          </div>
        </div>

        <div class="surface-secondary p-4 flex-col justify-between" style="min-width: 110px; flex-shrink: 0;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--bg-tertiary); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-3);">
            <i data-lucide="calendar" style="width: 16px; color: var(--accent-primary);"></i>
          </div>
          <div>
            <div class="text-xl font-bold text-primary mb-1">${thisMonthWorkouts}</div>
            <div class="text-xs text-secondary">This Month</div>
          </div>
        </div>

        <div class="surface-secondary p-4 flex-col justify-between" style="min-width: 110px; flex-shrink: 0;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-3);">
            <i data-lucide="flame" style="width: 16px; color: var(--warning);"></i>
          </div>
          <div>
            <div class="text-xl font-bold text-primary mb-1">${streak}</div>
            <div class="text-xs text-secondary">Day Streak</div>
          </div>
        </div>
      </div>

      <!-- Today Section -->
      <div class="flex items-center justify-between mb-4 mt-2">
        <h2 class="text-lg font-bold text-primary">Today</h2>
        <a href="#/routines" class="text-sm text-blue font-medium" style="text-decoration: none;">View All</a>
      </div>

      <div class="surface-secondary mb-6" style="overflow: hidden; position: relative;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to right, #111827, #1f2937 60%, transparent); z-index: 1;"></div>
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop" style="position: absolute; right: 0; top: 0; height: 100%; width: 60%; object-fit: cover; z-index: 0; opacity: 0.8;" />
        
        <div style="position: relative; z-index: 2; padding: var(--spacing-5);">
          <h3 class="text-xl font-bold text-on-primary mb-1">${todayWorkout.name}</h3>
          <p class="text-sm" style="color: rgba(255,255,255,0.7); margin-bottom: 4px;">Chest &bull; Shoulders &bull; Triceps</p>
          <p class="text-xs mb-6" style="color: rgba(255,255,255,0.5);">~1 hour &bull; ${todayWorkout.exercises.length} exercises</p>
          
          <a href="#/workout" class="btn btn-primary w-full" style="text-decoration: none;">Start Workout</a>
        </div>
      </div>

      <!-- Weekly Split Section Container -->
      <div id="weekly-split-container"></div>

      <!-- Your Routines Section -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-primary">Your Routines</h2>
        <a href="#/routines" class="text-sm text-blue font-medium" style="text-decoration: none;">View All</a>
      </div>

      <div class="surface-secondary p-2 flex-col" id="routines-container">
        <!-- Injected dynamically -->
      </div>

    </div>
  `;
};

export const init = () => {
  const renderRoutines = () => {
    const container = document.getElementById('routines-container');
    if (!container) return;

    const splitValues = Object.values(weeklySplit).map(v => v.trim()).filter(v => v.toLowerCase() !== 'rest' && v !== '');
    const uniqueRoutines = [...new Set(splitValues)];

    const defaultImages = [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100',
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=100',
      'https://images.unsplash.com/photo-1434596922112-19c563067271?w=100',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100'
    ];

    container.innerHTML = uniqueRoutines.map((routineName, idx) => `
      <div class="flex items-center justify-between p-3" style="border-bottom: 1px solid var(--border-light);">
        <div class="flex items-center gap-3">
          <div style="width: 48px; height: 48px; border-radius: var(--radius-sm); background: #eee; overflow: hidden;">
             <img src="${defaultImages[idx % defaultImages.length]}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div>
            <div class="font-bold text-primary text-sm mb-1">${routineName}</div>
            <div class="text-xs text-secondary">${Math.floor(Math.random() * 3) + 5} exercises</div>
          </div>
        </div>
        <i data-lucide="more-vertical" class="text-tertiary" style="width: 16px;"></i>
      </div>
    `).join('');
    
    if (window.lucide) window.lucide.createIcons();
  };

  const renderSplit = () => {
    const container = document.getElementById('weekly-split-container');
    if (!container) return;

    if (isEditingSplit) {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-4 mt-6">
          <h2 class="text-lg font-bold text-primary">Weekly Split</h2>
          <button id="btn-save-split" class="text-sm font-medium" style="background:none; border:none; padding:0; cursor:pointer; color: var(--success);">Save</button>
        </div>
        <div class="surface-secondary p-4 flex-col gap-3 mb-6">
          ${Object.entries(weeklySplit).map(([day, target]) => `
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm font-medium text-secondary" style="width: 40px;">${day}</span>
              <input type="text" class="input-control split-input" data-day="${day}" value="${target}" style="height: 36px; padding: 0 12px; font-size: 14px; background: var(--bg-tertiary); border: 1px solid var(--border-light);" />
            </div>
          `).join('')}
        </div>
      `;

      document.getElementById('btn-save-split').addEventListener('click', () => {
        document.querySelectorAll('.split-input').forEach(input => {
          weeklySplit[input.getAttribute('data-day')] = input.value;
        });
        isEditingSplit = false;
        renderSplit();
        renderRoutines();
      });
    } else {
      container.innerHTML = `
        <div class="flex items-center justify-between mb-4 mt-6">
          <h2 class="text-lg font-bold text-primary">Weekly Split</h2>
          <button id="btn-edit-split" class="text-sm text-blue font-medium" style="background:none; border:none; padding:0; cursor:pointer;">Edit</button>
        </div>
        <div class="surface-secondary p-4 flex-col gap-3 mb-6">
          ${Object.entries(weeklySplit).map(([day, target]) => `
            <div class="flex items-center justify-between" style="border-bottom: 1px solid var(--bg-primary); padding-bottom: 8px;">
              <span class="text-sm font-medium text-secondary" style="width: 40px;">${day}</span>
              <span class="text-sm font-bold text-primary flex-grow text-right">${target}</span>
            </div>
          `).join('')}
        </div>
      `;

      document.getElementById('btn-edit-split').addEventListener('click', () => {
        isEditingSplit = true;
        renderSplit();
      });
    }
  };

  renderSplit();
  renderRoutines();

  import('lucide').then(({ createIcons, Calendar, Flame, MoreVertical }) => {
    createIcons({
      icons: { Calendar, Flame, MoreVertical },
      attrs: { strokeWidth: 2 }
    });
    if (window.lucide) window.lucide.createIcons();
  });
};
