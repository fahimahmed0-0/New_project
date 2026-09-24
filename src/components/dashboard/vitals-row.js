export const renderVitalsRow = (vitals) => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-stagger-card flex-col items-center justify-center text-center">
      <h4 class="text-sm text-secondary uppercase tracking-wider mb-2">Calories</h4>
      <div class="text-2xl font-display text-primary"><span class="js-counter">${vitals.calories}</span></div>
    </div>
    <div class="surface-secondary p-6 rounded-lg js-stagger-card flex-col items-center justify-center text-center">
      <h4 class="text-sm text-secondary uppercase tracking-wider mb-2">Water</h4>
      <div class="text-2xl font-display text-primary"><span class="js-counter" data-float="true">${vitals.water}</span>L</div>
    </div>
    <div class="surface-secondary p-6 rounded-lg js-stagger-card flex-col items-center justify-center text-center">
      <h4 class="text-sm text-secondary uppercase tracking-wider mb-2">Sleep</h4>
      <div class="text-2xl font-display text-primary"><span class="js-counter" data-float="true">${vitals.sleep}</span>h</div>
    </div>
  `;
};
