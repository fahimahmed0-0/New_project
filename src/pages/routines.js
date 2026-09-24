import { weeklySplit } from '../data/mock-data.js';

export const render = () => {
  return `
    <div class="page-content js-fade-up">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-primary">Your Routines</h1>
        <a href="#/create-routine" class="btn btn-primary btn-sm" style="height: 32px; text-decoration: none;">
          <i data-lucide="plus" style="width: 16px; margin-right: 4px;"></i> New
        </a>
      </header>

      <div class="surface-secondary p-2 flex-col mb-8" id="routines-page-list">
        <!-- Injected dynamically -->
      </div>
      
      <!-- Discover Routines -->
      <header class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-primary">Discover</h2>
      </header>
      
      <div class="grid grid-2 gap-4">
        <div class="surface-secondary p-4 flex-col" style="border: 1px solid var(--border-light);">
          <div class="font-bold text-primary text-sm mb-1">PPL Split</div>
          <div class="text-xs text-secondary mb-3">6 days/week</div>
          <button class="btn btn-outline btn-sm w-full" style="border-color: var(--accent-primary); color: var(--accent-primary);">View</button>
        </div>
        
        <div class="surface-secondary p-4 flex-col" style="border: 1px solid var(--border-light);">
          <div class="font-bold text-primary text-sm mb-1">Arnold Split</div>
          <div class="text-xs text-secondary mb-3">6 days/week</div>
          <button class="btn btn-outline btn-sm w-full" style="border-color: var(--accent-primary); color: var(--accent-primary);">View</button>
        </div>
        
        <div class="surface-secondary p-4 flex-col" style="border: 1px solid var(--border-light);">
          <div class="font-bold text-primary text-sm mb-1">Upper / Lower</div>
          <div class="text-xs text-secondary mb-3">4 days/week</div>
          <button class="btn btn-outline btn-sm w-full" style="border-color: var(--accent-primary); color: var(--accent-primary);">View</button>
        </div>
        
        <div class="surface-secondary p-4 flex-col" style="border: 1px solid var(--border-light);">
          <div class="font-bold text-primary text-sm mb-1">Full Body</div>
          <div class="text-xs text-secondary mb-3">3 days/week</div>
          <button class="btn btn-outline btn-sm w-full" style="border-color: var(--accent-primary); color: var(--accent-primary);">View</button>
        </div>
      </div>

    </div>
  `;
};

export const init = () => {
  const container = document.getElementById('routines-page-list');
  if (container) {
    // Reverse engineer logic from Weekly Split!
    const splitValues = Object.values(weeklySplit).map(v => v.trim()).filter(v => v.toLowerCase() !== 'rest' && v !== '');
    const uniqueRoutines = [...new Set(splitValues)];

    const defaultImages = [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100',
      'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=100',
      'https://images.unsplash.com/photo-1434596922112-19c563067271?w=100',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100'
    ];

    if (uniqueRoutines.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-sm text-secondary">No custom routines found in your Weekly Split.</div>';
    } else {
      container.innerHTML = uniqueRoutines.map((routineName, idx) => `
        <div class="flex items-center justify-between p-4" style="border-bottom: 1px solid var(--border-light);">
          <div class="flex items-center gap-4">
            <div style="width: 56px; height: 56px; border-radius: var(--radius-md); background: #eee; overflow: hidden;">
               <img src="${defaultImages[idx % defaultImages.length]}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div>
              <div class="font-bold text-primary text-base mb-1">${routineName}</div>
              <div class="text-xs text-secondary">${Math.floor(Math.random() * 3) + 5} exercises</div>
            </div>
          </div>
          <a href="#/workout" style="text-decoration: none;">
             <i data-lucide="play-circle" class="text-accent" style="width: 28px; color: var(--accent-primary);"></i>
          </a>
        </div>
      `).join('');
    }
  }

  import('lucide').then(({ createIcons, Plus, PlayCircle }) => {
    createIcons({
      icons: { Plus, PlayCircle },
      attrs: { strokeWidth: 2 }
    });
    if (window.lucide) window.lucide.createIcons();
  });
};
