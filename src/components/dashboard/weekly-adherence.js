export const renderWeeklyAdherence = (data) => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-stagger-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <h4 class="text-sm text-secondary uppercase tracking-wider mb-4">Weekly Adherence</h4>
      <div style="font-family: var(--font-display); font-size: var(--text-3xl); color: var(--accent-secondary); margin-bottom: var(--spacing-2);">
        &#9679;&#9679;&#9679;&#9679;&#9679;&#9675;&#9675;
      </div>
      <div class="text-primary font-bold text-xl">${data.completed}/${data.target}</div>
    </div>
  `;
};
