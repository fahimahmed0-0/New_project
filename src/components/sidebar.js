import { createIcons, Home, Dumbbell, TrendingUp, AlertTriangle, Heart, Calendar } from 'lucide';
import { state } from '../state.js';

export const renderSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'home' },
    { name: 'Workout', path: '/workout', icon: 'dumbbell' },
    { name: 'Progress', path: '/progress', icon: 'trending-up' },
    { name: 'Plateau', path: '/plateau', icon: 'alert-triangle' },
    { name: 'Recovery', path: '/recovery', icon: 'heart' },
    { name: 'History', path: '/history', icon: 'calendar' }
  ];

  const currentPath = state.currentRoute;

  const html = `
    <aside class="sidebar surface-secondary">
      <div class="sidebar-logo">
        <h2 class="text-2xl font-display" style="color: var(--accent-primary);">ProgressFit</h2>
      </div>
      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <a href="#${item.path}" class="sidebar-link ${currentPath === item.path ? 'active' : ''}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.name}</span>
          </a>
        `).join('')}
      </nav>
    </aside>
  `;

  // Inline styles for sidebar (in a real app, might go to layout.css)
  const styles = `
    <style>
      .sidebar {
        width: var(--sidebar-width);
        height: 100dvh;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        border-radius: 0;
        border-right: 1px solid var(--white-5);
        z-index: var(--z-sidebar);
      }
      .sidebar-logo {
        padding: var(--spacing-8) var(--spacing-6);
      }
      .sidebar-nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
        padding: 0 var(--spacing-4);
      }
      .sidebar-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        padding: var(--spacing-3) var(--spacing-4);
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: var(--radius-md);
        transition: var(--transition-all);
        font-weight: 500;
      }
      .sidebar-link:hover {
        background-color: var(--white-5);
        color: var(--text-primary);
      }
      .sidebar-link.active {
        background: var(--accent-primary-gradient);
        color: #fff;
        box-shadow: 0 4px 12px var(--primary-glow);
      }
      .sidebar-link i {
        width: 20px;
        height: 20px;
      }
      @media (max-width: 768px) {
        .sidebar { display: none; }
      }
    </style>
  `;

  return styles + html;
};

export const initSidebarIcons = () => {
  createIcons({
    icons: { Home, Dumbbell, TrendingUp, AlertTriangle, Heart, Calendar }
  });
};
