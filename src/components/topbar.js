import { user } from '../data/mock-data.js';

export const renderTopbar = () => {
  const date = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'short', day: 'numeric' 
  });

  return `
    <header class="topbar flex items-center justify-between">
      <div>
        <h2 class="text-xl font-display">Hello, ${user.name}</h2>
        <p class="text-sm text-secondary">${date}</p>
      </div>
      <div class="user-avatar surface-elevated">
        ${user.name.charAt(0)}
      </div>
    </header>
    <style>
      .topbar {
        padding-bottom: var(--spacing-6);
        border-bottom: 1px solid var(--white-5);
        margin-bottom: var(--spacing-8);
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        color: var(--accent-primary);
        padding: 0;
      }
    </style>
  `;
};
