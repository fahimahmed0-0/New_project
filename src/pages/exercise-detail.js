import { renderWeightComparison } from '../components/exercise/weight-comparison.js';
import { renderOrmDisplay } from '../components/exercise/orm-display.js';
import { renderVolumeSummary } from '../components/exercise/volume-summary.js';
import { renderProgressionChart, initProgressionChart } from '../components/exercise/progression-chart.js';
import { renderHistoryTable } from '../components/exercise/history-table.js';
import { animations } from '../lib/animations.js';
import { createIcons, ArrowLeft } from 'lucide';
import { Chart } from 'chart.js';

export const render = () => {
  return `
    <div class="exercise-page pb-24">
      <header class="mb-8 js-fade-up">
        <a href="#/progress" class="text-secondary flex items-center gap-2 mb-4 text-sm" style="text-decoration: none;">
          <i data-lucide="arrow-left" style="width: 16px;"></i> Back to Progress
        </a>
        <h1 class="text-4xl font-display text-primary mb-2">Bench Press</h1>
        <div style="height: 2px; width: 100px; background: var(--accent-primary); margin-top: var(--spacing-4);"></div>
      </header>

      <div class="flex-col" style="gap: var(--spacing-6);">
        ${renderWeightComparison()}
        <div class="grid grid-2" style="gap: var(--spacing-6);">
          ${renderOrmDisplay()}
          ${renderVolumeSummary()}
        </div>
        ${renderProgressionChart()}
        ${renderHistoryTable()}
      </div>
    </div>
  `;
};

export const init = () => {
  createIcons({
    icons: { ArrowLeft },
    attrs: { strokeWidth: 2 }
  });

  initProgressionChart();

  const fadeElements = document.querySelectorAll('.js-fade-up');
  fadeElements.forEach((el, index) => {
    animations.fadeInUp(el, index * 0.1);
  });
};
