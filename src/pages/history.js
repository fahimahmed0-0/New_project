import { workoutHistory } from '../data/mock-data.js';

export const render = () => {
  const date = new Date(2026, 8, 1); // September 2026 for consistency with mockup
  const monthName = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  // Generate Calendar Days (Simplified logic for Sep 2026)
  let calendarHtml = '';
  // Sep 2026 starts on Tuesday (offset 2)
  for (let i = 0; i < 2; i++) calendarHtml += `<div></div>`;
  
  // 30 days in September
  for (let day = 1; day <= 30; day++) {
    // Let's add some logic to highlight workout days from mock data
    const isWorkoutDay = workoutHistory.some(w => {
      const wDate = new Date(w.date);
      return wDate.getMonth() === 8 && wDate.getFullYear() === 2026 && wDate.getDate() === day;
    });

    let activeClass = 'text-sm font-medium';
    let style = '';
    
    if (day === 14) {
      activeClass = 'text-sm font-bold text-on-primary';
      style = 'width: 32px; height: 32px; border-radius: 50%; background: var(--accent-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: var(--shadow-blue);';
    } else if (isWorkoutDay) {
      style = 'width: 32px; height: 32px; border-radius: 50%; background: var(--accent-secondary); color: var(--accent-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto;';
    }

    calendarHtml += `<div class="${activeClass}" style="${style}">${day}</div>`;
  }

  // History List logic
  const historyListHtml = workoutHistory.slice(0, 5).map(session => {
    const sessionDate = new Date(session.date);
    const dateStr = sessionDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    
    return `
      <div class="flex items-center justify-between p-3" style="border-bottom: 1px solid var(--border-light);">
        <div class="flex items-center gap-4">
          <div style="width: 40px; height: 50px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
             <i data-lucide="user" style="color: #9CA3AF;"></i>
          </div>
          <div>
            <div class="text-xs text-secondary mb-1">${dateStr}</div>
            <div class="font-bold text-primary text-sm mb-1">${session.name}</div>
            <div class="text-xs text-tertiary">~1h &bull; ${session.exercises.length} exercises</div>
          </div>
        </div>
        <i data-lucide="more-vertical" class="text-tertiary" style="width: 16px;"></i>
      </div>
    `;
  }).join('');


  return `
    <div class="page-content js-fade-up">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-primary">Calendar</h1>
        <i data-lucide="scan-line" style="width: 24px; color: var(--text-primary);"></i>
      </header>

      <!-- Calendar Month Selector -->
      <div class="flex items-center justify-between mb-4 px-2">
        <i data-lucide="chevron-left" style="width: 20px; color: var(--text-secondary); cursor: pointer;"></i>
        <div class="font-bold text-primary">${monthName} ${year} <i data-lucide="chevron-down" style="width: 16px; display: inline-block; vertical-align: -3px; color: var(--text-secondary);"></i></div>
        <i data-lucide="chevron-right" style="width: 20px; color: var(--text-secondary); cursor: pointer;"></i>
      </div>

      <!-- Calendar Grid -->
      <div class="mb-8">
        <div class="grid grid-cols-7 text-center mb-4" style="grid-template-columns: repeat(7, 1fr);">
          <div class="text-xs text-secondary font-medium">Sun</div>
          <div class="text-xs text-secondary font-medium">Mon</div>
          <div class="text-xs text-secondary font-medium">Tue</div>
          <div class="text-xs text-secondary font-medium">Wed</div>
          <div class="text-xs text-secondary font-medium">Thu</div>
          <div class="text-xs text-secondary font-medium">Fri</div>
          <div class="text-xs text-secondary font-medium">Sat</div>
        </div>
        
        <div class="grid grid-cols-7 text-center gap-y-4" style="grid-template-columns: repeat(7, 1fr); gap: 16px 0;">
          ${calendarHtml}
        </div>
      </div>

      <!-- Workout History Section -->
      <div class="flex items-center justify-between mb-4 mt-2">
        <h2 class="text-lg font-bold text-primary">Workout History</h2>
        <a href="#/history" class="text-sm text-blue font-medium" style="text-decoration: none;">View All</a>
      </div>

      <div class="surface-secondary p-2 flex-col">
        ${historyListHtml}
      </div>

    </div>
  `;
};

export const init = () => {
  import('lucide').then(({ createIcons, ScanLine, ChevronLeft, ChevronRight, ChevronDown, User, MoreVertical }) => {
    createIcons({
      icons: { ScanLine, ChevronLeft, ChevronRight, ChevronDown, User, MoreVertical },
      attrs: { strokeWidth: 2 }
    });
    if (window.lucide) window.lucide.createIcons();
  });
};
