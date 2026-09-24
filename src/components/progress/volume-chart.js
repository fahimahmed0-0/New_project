import { Chart } from 'chart.js';
import { getCssVar, hexToRgba } from '../lib/chart-config.js';

let volumeChartInstance = null;

export const renderVolumeChart = () => {
  return `
    <div class="surface-secondary rounded-lg js-chart-reveal" style="padding: var(--spacing-6); margin-bottom: var(--spacing-8);">
      <h3 class="text-lg font-display mb-1">Total Volume (kg)</h3>
      <p class="text-sm text-secondary mb-6">Aggregate workload across all exercises.</p>
      <div class="chart-container">
        <canvas id="volume-chart"></canvas>
      </div>
    </div>
  `;
};

export const initVolumeChart = (labels, dataPoints) => {
  const canvas = document.getElementById('volume-chart');
  if (!canvas) return null;
  
  const ctx = canvas.getContext('2d');
  
  // Create dynamic gradient for the area chart
  const primaryColor = getCssVar('--accent-primary') || '#6C63FF';
  const bgColor = getCssVar('--bg-primary') || '#14141E';

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, hexToRgba(primaryColor, 0.4));
  gradient.addColorStop(1, hexToRgba(primaryColor, 0.0));

  volumeChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Volume',
        data: dataPoints,
        borderColor: primaryColor,
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: bgColor,
        pointBorderColor: primaryColor,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4 // Smooth curve
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      }
    }
  });
  
  return volumeChartInstance;
};

export const updateVolumeChart = (labels, dataPoints) => {
  if (volumeChartInstance) {
    volumeChartInstance.data.labels = labels;
    volumeChartInstance.data.datasets[0].data = dataPoints;
    volumeChartInstance.update();
  }
};
