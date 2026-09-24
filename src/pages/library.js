export const render = () => {
  return `
    <div class="page-content js-fade-up">
      <!-- Header -->
      <header class="mb-4">
        <h1 class="text-2xl font-bold text-primary mb-1">Exercise Library</h1>
        <p class="text-sm text-secondary">Search and learn exercises</p>
      </header>

      <!-- Search -->
      <div class="mb-4 relative" style="position: relative;">
        <i data-lucide="search" style="position: absolute; left: 16px; top: 14px; width: 20px; color: var(--text-tertiary);"></i>
        <input type="text" id="library-search" class="input-control" placeholder="Search exercises (e.g. bench press)" style="padding-left: 48px; background: var(--bg-tertiary); border: 1px solid var(--border-light);" />
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2" id="library-filters" style="scrollbar-width: none;">
        <button class="badge text-xs filter-btn active" data-filter="All" style="padding: 6px 16px; min-width: 50px;">All</button>
        <button class="badge badge-gray text-xs filter-btn" data-filter="Chest" style="padding: 6px 16px; border: none; min-width: 60px;">Chest</button>
        <button class="badge badge-gray text-xs filter-btn" data-filter="Back" style="padding: 6px 16px; border: none; min-width: 60px;">Back</button>
        <button class="badge badge-gray text-xs filter-btn" data-filter="Shoulders" style="padding: 6px 16px; border: none; min-width: 80px;">Shoulders</button>
        <button class="badge badge-gray text-xs filter-btn" data-filter="Legs" style="padding: 6px 16px; border: none; min-width: 60px;">Legs</button>
      </div>

      <!-- List -->
      <div class="surface-secondary flex-col" id="exercise-list">
        <!-- Injected via init() -->
      </div>

    </div>
  `;
};

export const init = () => {
  const exercises = [
    { name: 'Barbell Bench Press', muscle: 'Chest', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100' },
    { name: 'Incline Dumbbell Press', muscle: 'Chest', img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=100' },
    { name: 'Chest Fly (Machine)', muscle: 'Chest', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100' },
    { name: 'Push Up', muscle: 'Chest', img: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=100' },
    { name: 'Dumbbell Shoulder Press', muscle: 'Shoulders', img: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=100' },
    { name: 'Lateral Raise', muscle: 'Shoulders', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100' },
    { name: 'Pull Up', muscle: 'Back', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100' },
    { name: 'Barbell Row', muscle: 'Back', img: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=100' },
    { name: 'Squat', muscle: 'Legs', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100' }
  ];

  const listContainer = document.getElementById('exercise-list');
  const searchInput = document.getElementById('library-search');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentFilter = 'All';
  let searchQuery = '';

  const renderList = () => {
    const filtered = exercises.filter(ex => {
      const matchFilter = currentFilter === 'All' || ex.muscle === currentFilter;
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    listContainer.innerHTML = filtered.map(ex => `
      <div class="flex items-center justify-between p-4" style="border-bottom: 1px solid var(--border-light);">
        <div style="width: 56px; height: 56px; border-radius: var(--radius-sm); background: #eee; overflow: hidden; margin-right: 16px; flex-shrink: 0;">
          <img src="${ex.img}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="flex-grow: 1;">
          <div class="font-bold text-primary text-sm mb-1">${ex.name}</div>
          <div class="text-xs text-secondary">${ex.muscle}</div>
        </div>
        <div class="flex items-center gap-2">
          <div style="width: 32px; height: 48px; background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Muscles_anterior_labeled.svg/1024px-Muscles_anterior_labeled.svg.png') center/contain no-repeat; filter: grayscale(1) contrast(0.3) brightness(1.7);"></div>
          <i data-lucide="more-vertical" style="width: 20px; color: var(--text-tertiary);"></i>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderList();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update UI
      filterBtns.forEach(b => {
        b.className = 'badge badge-gray text-xs filter-btn';
        b.style.background = 'var(--bg-tertiary)';
        b.style.color = 'var(--text-secondary)';
      });
      btn.className = 'badge text-xs filter-btn active';
      btn.style.background = 'var(--accent-primary)';
      btn.style.color = 'white';
      
      // Filter logic
      currentFilter = btn.getAttribute('data-filter');
      renderList();
    });
  });

  // initial render
  // apply style to initial active tab
  const activeTab = document.querySelector('.filter-btn.active');
  if(activeTab) {
      activeTab.style.background = 'var(--accent-primary)';
      activeTab.style.color = 'white';
  }
  
  import('lucide').then(({ createIcons, Search, MoreVertical }) => {
    createIcons({
      icons: { Search, MoreVertical },
      attrs: { strokeWidth: 2 }
    });
    renderList();
  });
};
