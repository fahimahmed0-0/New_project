export const renderWorkoutProgress = (currentIndex, total) => {
  const percentage = Math.round((currentIndex / total) * 100);
  return `
    <div class="mb-8 js-fade-up">
      <div class="flex items-center justify-between text-sm text-secondary mb-2">
        <span>PUSH DAY</span>
        <span>${currentIndex}/${total} exercises</span>
      </div>
      <div style="width: 100%; height: 4px; background: var(--white-10); border-radius: var(--radius-full); overflow: hidden;">
        <div id="workout-progress-bar" style="width: ${percentage}%; height: 100%; background: var(--accent-primary); transition: width 0.3s ease;"></div>
      </div>
    </div>
  `;
};
