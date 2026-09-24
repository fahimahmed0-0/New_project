export const renderSleepChart = () => {
  return `
    <div class="surface-secondary p-6 rounded-lg js-fade-up">
      <h3 class="text-lg font-display mb-4">Sleep Quality & Duration</h3>
      <div class="chart-container" style="height: 200px;">
        <canvas id="recovery-sleep-chart"></canvas>
      </div>
    </div>
  `;
};

export const initSleepChart = () => {
  const canvas = document.getElementById('recovery-sleep-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Hours',
        data: [7.2, 6.8, 7.5, 6.2, 7.0, 8.1, 7.4],
        backgroundColor: '#6C63FF',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
};
