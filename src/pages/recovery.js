import { renderSleepChart, initSleepChart } from '../components/recovery/sleep-chart.js';
import { renderHydrationTracker } from '../components/recovery/hydration-tracker.js';
import { renderNutritionOverview } from '../components/recovery/nutrition-overview.js';
import { renderRecoveryScore } from '../components/recovery/recovery-score.js';
import { renderTrendsGrid } from '../components/recovery/trends-grid.js';
import { animations } from '../lib/animations.js';
import { Chart } from 'chart.js';

export const render = () => {
  return `
    <div class="recovery-page pb-24">
      <header class="flex items-center justify-between mb-8 js-fade-up">
        <div>
          <h1 class="text-4xl font-display text-primary mb-2">Recovery</h1>
          <p class="text-sm text-secondary">Track vitals and optimize rest.</p>
        </div>
      </header>

      <div class="flex-col" style="gap: var(--spacing-6);">
        ${renderRecoveryScore()}
        <div class="grid grid-2" style="gap: var(--spacing-6);">
          ${renderNutritionOverview()}
          ${renderHydrationTracker()}
        </div>
        ${renderSleepChart()}
        ${renderTrendsGrid()}
      </div>
    </div>
  `;
};

export const init = () => {
  initSleepChart();

  const fadeElements = document.querySelectorAll('.js-fade-up');
  fadeElements.forEach((el, index) => {
    animations.fadeInUp(el, index * 0.1);
  });
};
