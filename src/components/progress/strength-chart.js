import { Chart } from 'chart.js';
import { getCssVar } from '../lib/chart-config.js';

let strengthChartInstance = null;

export const renderStrengthChart = () => {
  return `
    <div class="surface-secondary rounded-lg js-chart-reveal" style="padding: var(--spacing-6);">
      <h3 class="text-lg font-display mb-1">Estimated 1RM (Bench Press)</h3>
      <p class="text-sm text-secondary mb-6">Based on Brzycki formula calculations.</p>
      <div class="chart-container">
        <canvas id="strength-chart"></canvas>
      </div>
    </div>
  `;
};

export const initStrengthChart = (labels, dataPoints) => {
  const canvas = document.getElementById('strength-chart');
  if (!canvas) return null;
  
  const ctx = canvas.getContext('2d');
  const secondaryColor = getCssVar('--accent-secondary') || '#00F0FF';
  const bgColor = getCssVar('--bg-primary') || '#14141E';

  strengthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '1RM (kg)',
        data: dataPoints,
        borderColor: secondaryColor,
        borderWidth: 3,
        pointBackgroundColor: bgColor,
        pointBorderColor: secondaryColor,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.1 // Stiffer curve for strength tracking
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { 
           beginAtZero: false,
           suggestedMin: Math.min(...dataPoints) - 5
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      }
    }
  });
  
  return strengthChartInstance;
};

export const updateStrengthChart = (labels, dataPoints) => {
  if (strengthChartInstance) {
    strengthChartInstance.data.labels = labels;
    strengthChartInstance.data.datasets[0].data = dataPoints;
    strengthChartInstance.update();
  }
};
