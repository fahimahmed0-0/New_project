import { renderPlateauDetector } from '../components/plateau/plateau-detector.js';
import { renderTrendChart, initTrendChart } from '../components/plateau/trend-chart.js';
import { renderCorrelationPanel } from '../components/plateau/correlation-panel.js';
import { renderFactorsList } from '../components/plateau/factors-list.js';
import { renderConsistencyHeatmap } from '../components/plateau/consistency-heatmap.js';
import { animations } from '../lib/animations.js';
import { createIcons, AlertTriangle } from 'lucide';
import { Chart } from 'chart.js';

export const render = () => {
  return `
    <div class="plateau-page pb-24">
      <header class="flex items-center justify-between mb-8 js-fade-up">
        <div>
          <h1 class="text-4xl font-display text-primary mb-2">Plateau Analysis</h1>
          <p class="text-sm text-secondary">Diagnose stalling lifts and optimize recovery.</p>
        </div>
      </header>

      <div class="flex-col" style="gap: var(--spacing-6);">
        ${renderPlateauDetector()}
        <div class="grid grid-2" style="gap: var(--spacing-6);">
          ${renderTrendChart()}
          ${renderCorrelationPanel()}
        </div>
        ${renderFactorsList()}
        ${renderConsistencyHeatmap()}
      </div>
    </div>
  `;
};

export const init = () => {
  createIcons({
    icons: { AlertTriangle },
    attrs: { strokeWidth: 2 }
  });

  initTrendChart();

  const fadeElements = document.querySelectorAll('.js-fade-up');
  fadeElements.forEach((el, index) => {
    animations.fadeInUp(el, index * 0.1);
  });
};
