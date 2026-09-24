export const renderProgressionChart = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">Progression (Weight vs Reps)</h3>
      <div class="chart-container" style="height: 250px;">
        <canvas id="exercise-progression-chart"></canvas>
      </div>
    </div>
  `;
};

export const initProgressionChart = () => {
  const canvas = document.getElementById('exercise-progression-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sep 1', 'Sep 5', 'Sep 10', 'Sep 14', 'Sep 18'],
      datasets: [{
        label: 'Weight (kg)',
        data: [57.5, 60, 60, 60, 62.5],
        borderColor: '#6C63FF',
        yAxisID: 'y'
      }, {
        label: 'Reps',
        data: [10, 8, 9, 10, 10],
        borderColor: '#06D6A0',
        borderDash: [5, 5],
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { type: 'linear', position: 'left' },
        y1: { type: 'linear', position: 'right' }
      }
    }
  });
};
