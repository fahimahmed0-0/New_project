export const renderSetRow = (set, index, targetWeight) => {
  const isComplete = false; // Initialize empty
  const previousWeightNumber = 60; // Mock

  return `
    <div class="flex items-center justify-between" style="padding: var(--spacing-3) 0; border-bottom: 1px solid var(--white-5);">
      <div class="text-secondary font-medium" style="width: 32px;">${index + 1}</div>
      <div class="text-tertiary text-sm text-center" style="width: 64px; font-family: var(--font-display);">${previousWeightNumber}</div>
      
      <div class="flex items-center justify-center text-center" style="width: var(--input-workout-width);">
        <input type="number" 
               class="input-control input-workout js-weight-input" 
               placeholder="0" 
               data-target="${targetWeight}"
               data-prev="${previousWeightNumber}" />
      </div>

      <div class="flex items-center justify-center text-center" style="width: var(--input-workout-width);">
        <input type="number" 
               class="input-control input-workout js-reps-input" 
               placeholder="${set.reps}" />
      </div>

      <div class="flex items-center justify-end" style="width: 32px;">
        <button class="btn js-complete-set" style="width: 32px; height: 32px; border-radius: 50%; background: var(--bg-tertiary); border: 1px solid var(--white-10); display: flex; align-items: center; justify-content: center; padding: 0; transition: all 0.2s ease;">
          <i data-lucide="check" style="width: 14px; height: 14px; color: var(--text-tertiary);"></i>
        </button>
      </div>
    </div>
  `;
};
