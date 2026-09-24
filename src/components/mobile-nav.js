export const renderMobileNav = () => {
  const currentPath = window.location.hash.slice(1) || '/';
  
  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/routines', icon: 'clipboard-list', label: 'Routines' },
    { path: '/progress', icon: 'bar-chart-2', label: 'Progress' },
    { path: '/music', icon: 'music', label: 'Music' },
    { path: '/profile', icon: 'user', label: 'Profile' }
  ];

  let navHtml = '';
  navItems.forEach(item => {
    const isActive = currentPath === item.path || (currentPath === '' && item.path === '/');
    const colorClass = isActive ? 'text-blue font-semibold' : 'text-tertiary';
    navHtml += `
      <a href="#${item.path}" class="flex-col items-center justify-center transition-all ${colorClass}" style="text-decoration: none; min-width: 60px;">
        <i data-lucide="${item.icon}" style="width: 24px; height: 24px; margin-bottom: 4px; ${isActive ? 'stroke-width: 2.5px;' : ''}"></i>
        <span class="text-xs" style="font-size: 10px;">${item.label}</span>
      </a>
    `;
  });

  const existingNav = document.getElementById('mobile-nav');
  if (existingNav) {
    existingNav.innerHTML = navHtml;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const navContainer = document.createElement('nav');
  navContainer.id = 'mobile-nav';
  navContainer.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--mobile-nav-height);
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-light);
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: env(safe-area-inset-bottom);
    z-index: var(--z-nav);
  `;
  navContainer.innerHTML = navHtml;
  
  const appContainer = document.getElementById('app');
  if (appContainer) {
    appContainer.appendChild(navContainer);
  } else {
    document.body.appendChild(navContainer);
  }
};
