import { todayWorkout } from '../data/mock-data.js';

export const render = () => {
  const exercise = todayWorkout.exercises[0]; // Barbell Bench Press (mocked id ex_001)
  const numSets = typeof exercise.sets === 'number' ? exercise.sets : 4;
  
  let setsHtml = '';
  for (let i = 0; i < numSets; i++) {
    // Generate dummy past performance for the first 3 sets, leave 4th blank
    const weight = 40 + (i * 10);
    const reps = i === 3 ? '-' : (10 - (i === 1 ? 2 : 0));
    
    // For styling the checkmark
    const isCompleted = i < 3;
    const checkBg = isCompleted ? 'var(--success)' : 'var(--bg-tertiary)';
    const checkIconColor = isCompleted ? 'white' : 'var(--text-secondary)';
    const textStyle = isCompleted ? 'text-primary' : 'text-tertiary';
    
    setsHtml += `
      <div class="flex items-center justify-between p-4 js-set-row cursor-pointer" data-completed="${isCompleted}" style="border-bottom: 1px solid var(--border-light); transition: all 0.2s;">
        <div class="text-sm font-bold text-secondary" style="width: 24px;">${i + 1}</div>
        <div class="text-base font-medium ${textStyle} flex-grow text-center js-set-text">${i === 3 ? '-' : `${weight} kg &times; ${reps}`}</div>
        <div class="js-check-circle transition-all" style="width: 24px; height: 24px; border-radius: 50%; background: ${checkBg}; display: flex; align-items: center; justify-content: center;">
          <i data-lucide="${isCompleted ? 'check' : 'minus'}" style="width: 14px; color: ${checkIconColor};" class="js-check-icon"></i>
        </div>
      </div>
    `;
  }

  return `
    <div class="page-content js-fade-up" style="padding-bottom: 120px;">
      <!-- Header -->
      <header class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <a href="#/" class="text-primary" style="text-decoration: none;">
            <i data-lucide="arrow-left" style="width: 24px;"></i>
          </a>
          <h1 class="text-xl font-bold text-primary">${todayWorkout.name}</h1>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm font-bold flex items-center gap-1">
            <i data-lucide="clock" style="width: 14px; color: var(--text-secondary);"></i> 
            <span id="workout-timer-display">00:24:15</span>
          </div>
          <i data-lucide="more-vertical" style="width: 20px; color: var(--text-primary);"></i>
        </div>
      </header>

      <!-- Exercise Title & Video -->
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-2xl font-bold text-primary">Barbell Bench Press</h2>
      </div>
      <div class="flex items-center justify-between mb-8">
        <span class="text-sm text-secondary font-medium">Set 3 of 4</span>
        <button class="btn btn-sm btn-secondary flex items-center gap-1" style="background: var(--accent-secondary); color: var(--accent-primary); border-radius: var(--radius-full); padding: 0 12px; height: 32px;">
          <i data-lucide="play" style="width: 14px; stroke: var(--accent-primary);"></i> Video
        </button>
      </div>

      <!-- Inputs -->
      <div class="grid grid-2 gap-4 mb-6">
        <div>
          <label class="block text-sm text-secondary font-medium mb-2">Weight (kg)</label>
          <input type="number" id="input-weight" class="input-control" value="60" style="background: var(--bg-secondary); border: 1px solid var(--border-light); font-size: 20px; font-weight: bold; text-align: center; height: 56px;" />
        </div>
        <div>
          <label class="block text-sm text-secondary font-medium mb-2">Reps</label>
          <input type="number" id="input-reps" class="input-control" value="8" style="background: var(--bg-secondary); border: 1px solid var(--border-light); font-size: 20px; font-weight: bold; text-align: center; height: 56px;" />
        </div>
      </div>

      <!-- Log Button -->
      <button id="btn-log-set" class="btn btn-primary w-full mb-8" style="height: 56px; font-size: 18px;">Log Set</button>

      <!-- Sets List -->
      <div class="surface-secondary flex-col" id="sets-container">
        ${setsHtml}
      </div>

      <!-- Rest Timer Floating Footer -->
      <div style="position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); width: calc(100% - 48px); max-width: 400px; background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-full); padding: 12px 24px; box-shadow: var(--shadow-md); display: flex; items-center; justify-content: space-between; align-items: center; z-index: var(--z-nav);">
        <div class="flex items-center gap-4">
          <div style="width: 40px; height: 40px; border-radius: 50%; border: 4px solid var(--accent-secondary); border-top-color: var(--accent-primary); border-right-color: var(--accent-primary); transition: all 1s linear;"></div>
          <div>
            <div class="text-xs text-secondary font-medium">Rest Timer</div>
            <div class="text-xl font-bold text-primary" id="rest-timer-display">01:30</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="btn-toggle-rest" style="width: 36px; height: 36px; border-radius: 50%; background: var(--bg-tertiary); border: none; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); cursor: pointer;">
            <i data-lucide="pause" style="width: 16px; stroke: currentColor;"></i>
          </button>
          <button id="btn-add-time" style="height: 36px; border-radius: var(--radius-full); padding: 0 12px; background: var(--accent-secondary); color: var(--accent-primary); border: none; font-weight: 600; font-size: 14px; cursor: pointer;">
            + 30s
          </button>
        </div>
      </div>
      
      <!-- Finish button to navigate to summary -->
      <button id="btn-finish-workout" class="btn btn-outline w-full mt-6" style="border-color: var(--success); color: var(--success);">Finish Workout</button>

    </div>
  `;
};

export const init = () => {
  import('lucide').then(({ createIcons, ArrowLeft, Clock, MoreVertical, Play, Check, Minus, Pause }) => {
    createIcons({
      icons: { ArrowLeft, Clock, MoreVertical, Play, Check, Minus, Pause },
      attrs: { strokeWidth: 2 }
    });
    if (window.lucide) window.lucide.createIcons();
  });
  
  // Hide mobile nav when on active workout page
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.style.display = 'none';

  // LOGIC: Log Set Button
  const logSetBtn = document.getElementById('btn-log-set');
  if (logSetBtn) {
    logSetBtn.addEventListener('click', () => {
      const weight = document.getElementById('input-weight').value;
      const reps = document.getElementById('input-reps').value;
      
      // Find first incomplete set
      const rows = Array.from(document.querySelectorAll('.js-set-row'));
      const incompleteRow = rows.find(row => row.getAttribute('data-completed') === 'false');
      
      if (incompleteRow) {
        // Update DOM
        incompleteRow.setAttribute('data-completed', 'true');
        incompleteRow.querySelector('.js-set-text').innerHTML = `${weight} kg &times; ${reps}`;
        incompleteRow.querySelector('.js-set-text').classList.remove('text-tertiary');
        incompleteRow.querySelector('.js-set-text').classList.add('text-primary');
        
        const circle = incompleteRow.querySelector('.js-check-circle');
        circle.style.background = 'var(--success)';
        
        const icon = incompleteRow.querySelector('.js-check-icon');
        icon.style.color = 'white';
        // Re-render check icon specifically
        icon.setAttribute('data-lucide', 'check');
        if (window.lucide) window.lucide.createIcons();
        
        // Start rest timer automatically
        startRestTimer(90);
      }
    });
  }

  // LOGIC: Set Row Clicking (Toggle Complete/Incomplete)
  const rows = document.querySelectorAll('.js-set-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const isCompleted = row.getAttribute('data-completed') === 'true';
      const circle = row.querySelector('.js-check-circle');
      const icon = row.querySelector('.js-check-icon');
      
      if (isCompleted) {
        row.setAttribute('data-completed', 'false');
        circle.style.background = 'var(--bg-tertiary)';
        icon.style.color = 'var(--text-secondary)';
        icon.setAttribute('data-lucide', 'minus');
      } else {
        row.setAttribute('data-completed', 'true');
        circle.style.background = 'var(--success)';
        icon.style.color = 'white';
        icon.setAttribute('data-lucide', 'check');
        // If it was blank, fill it with inputs
        const textEl = row.querySelector('.js-set-text');
        if (textEl.innerText.trim() === '-') {
            const w = document.getElementById('input-weight').value || 0;
            const r = document.getElementById('input-reps').value || 0;
            textEl.innerHTML = `${w} kg &times; ${r}`;
            textEl.classList.remove('text-tertiary');
            textEl.classList.add('text-primary');
        }
      }
      if (window.lucide) window.lucide.createIcons();
    });
  });

  // LOGIC: Rest Timer
  let restInterval;
  let remainingSeconds = 90;
  
  const startRestTimer = (seconds) => {
    clearInterval(restInterval);
    remainingSeconds = seconds;
    updateRestDisplay();
    
    restInterval = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(restInterval);
        remainingSeconds = 0;
      }
      updateRestDisplay();
    }, 1000);
  };
  
  const updateRestDisplay = () => {
    const min = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
    const sec = (remainingSeconds % 60).toString().padStart(2, '0');
    const display = document.getElementById('rest-timer-display');
    if (display) display.innerText = `${min}:${sec}`;
  };

  const toggleRestBtn = document.getElementById('btn-toggle-rest');
  if (toggleRestBtn) {
    toggleRestBtn.addEventListener('click', () => {
      if (restInterval) {
        clearInterval(restInterval);
        restInterval = null;
        // visual feedback could go here
      } else {
        startRestTimer(remainingSeconds > 0 ? remainingSeconds : 90);
      }
    });
  }

  const addTimeBtn = document.getElementById('btn-add-time');
  if (addTimeBtn) {
    addTimeBtn.addEventListener('click', () => {
      remainingSeconds += 30;
      updateRestDisplay();
      if (!restInterval) startRestTimer(remainingSeconds);
    });
  }

  // LOGIC: Navigate to summary
  const finishBtn = document.getElementById('btn-finish-workout');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      window.location.hash = '/workout-summary';
    });
  }

  return {
    destroy: () => {
      clearInterval(restInterval);
      const nav = document.getElementById('mobile-nav');
      if (nav) nav.style.display = 'flex';
    }
  };
};
