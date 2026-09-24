export const renderTrendChart = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">Load / Rep Trends (Stall Phase)</h3>
      <div class="chart-container" style="height: 200px;">
        <canvas id="plateau-trend-chart"></canvas>
      </div>
    </div>
  `;
};

export const initTrendChart = () => {
  const canvas = document.getElementById('plateau-trend-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'],
      datasets: [{
        label: 'Overhead Press (kg)',
        data: [40, 42.5, 45, 45, 45, 45],
        borderColor: '#FFB84D',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
};
