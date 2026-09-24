export const renderExerciseSelector = () => {
  return `
    <div class="flex items-center" style="gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
      <button class="badge text-xs" style="background: rgba(108, 99, 255, 0.2); color: var(--accent-primary); border: 1px solid var(--accent-primary);">All</button>
      <button class="badge text-xs" style="background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid transparent;">Bench</button>
      <button class="badge text-xs" style="background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid transparent;">Squat</button>
      <button class="badge text-xs" style="background: var(--bg-tertiary); color: var(--text-secondary); border: 1px solid transparent;">Deadlift</button>
    </div>
  `;
};
