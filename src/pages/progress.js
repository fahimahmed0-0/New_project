import { workoutHistory } from '../data/mock-data.js';

export const render = () => {
  // Logic for stats
  const totalWorkouts = workoutHistory.length;
  // Calculate total volume from history (mocking sum logic)
  const totalVolume = 9450; // hardcoded for the mockup aesthetic but we could calculate
  const totalTime = "6h 48m"; 

  // Logic for the Volume Chart (30 days of data)
  const chartData = Array.from({length: 30}).map((_, i) => {
    // Generate some fake volume data trending upwards
    return 10000 + (Math.random() * 5000) + (i * 100); 
  });
  
  const maxVol = Math.max(...chartData);
  
  const barsHtml = chartData.map((vol, i) => {
    const heightPercent = (vol / maxVol) * 100;
    const isDark = i % 7 === 0 || i === 29; // Highlight every week and the last day
    const color = isDark ? 'var(--accent-primary)' : 'var(--accent-secondary)';
    
    return `
      <div style="width: 6px; height: ${heightPercent}%; background: ${color}; border-radius: 2px; transition: height 0.5s ease-out;" title="Volume: ${Math.round(vol)} kg"></div>
    `;
  }).join('');

  return `
    <div class="page-content js-fade-up">
      <!-- Header -->
      <header class="mb-4">
        <h1 class="text-2xl font-bold text-primary">Progress</h1>
      </header>

      <!-- Tabs -->
      <div class="flex items-center gap-6 mb-6 overflow-x-auto" style="border-bottom: 1px solid var(--border-light); scrollbar-width: none;">
        <div class="text-sm font-semibold text-blue pb-2" style="border-bottom: 2px solid var(--accent-primary); white-space: nowrap;">Overview</div>
        <div class="text-sm font-medium text-secondary pb-2" style="white-space: nowrap;">Weights</div>
        <div class="text-sm font-medium text-secondary pb-2" style="white-space: nowrap;">Muscle Groups</div>
        <div class="text-sm font-medium text-secondary pb-2" style="white-space: nowrap;">PRs</div>
      </div>

      <!-- Time Chips -->
      <div class="flex items-center gap-2 mb-6 overflow-x-auto" style="scrollbar-width: none;">
        <button class="badge badge-gray text-xs" style="padding: 6px 12px; border: none;">1W</button>
        <button class="badge text-xs" style="padding: 6px 12px; background: var(--accent-primary); color: white; border: none; box-shadow: var(--shadow-blue);">1M</button>
        <button class="badge badge-gray text-xs" style="padding: 6px 12px; border: none;">3M</button>
        <button class="badge badge-gray text-xs" style="padding: 6px 12px; border: none;">6M</button>
        <button class="badge badge-gray text-xs" style="padding: 6px 12px; border: none;">1Y</button>
        <button class="badge badge-gray text-xs" style="padding: 6px 12px; border: none;">All</button>
      </div>

      <!-- Stats -->
      <div class="grid grid-3 gap-2 mb-8">
        <div class="flex-col text-center">
          <div class="text-xl font-bold text-primary mb-1">${totalWorkouts}</div>
          <div class="text-xs text-secondary">Workouts</div>
        </div>
        <div class="flex-col text-center">
          <div class="text-xl font-bold text-primary mb-1">${totalTime}</div>
          <div class="text-xs text-secondary">Total Time</div>
        </div>
        <div class="flex-col text-center">
          <div class="text-xl font-bold mb-1" style="color: var(--success);">+12%</div>
          <div class="text-xs text-secondary">Volume</div>
        </div>
      </div>

      <!-- Total Volume Chart -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-bold text-primary">Total Volume</h2>
          <span style="color: var(--success); font-weight: bold; font-size: 14px;">+12%</span>
        </div>
        <div style="height: 180px; display: flex; align-items: flex-end; justify-content: space-between; gap: 4px; padding-bottom: 24px; position: relative; border-bottom: 1px solid var(--border-light);">
          
          <!-- Y Axis Labels -->
          <div style="position: absolute; left: 0; top: 0; bottom: 24px; display: flex; flex-direction: column; justify-content: space-between; font-size: 10px; color: var(--text-tertiary);">
            <span>15k</span>
            <span>10k</span>
            <span>5k</span>
            <span>0</span>
          </div>

          <!-- Chart Bars -->
          <div style="margin-left: 24px; flex-grow: 1; display: flex; align-items: flex-end; justify-content: space-between; height: 100%;">
            ${barsHtml}
          </div>

          <!-- X Axis Labels -->
          <div style="position: absolute; bottom: 0; left: 24px; right: 0; display: flex; justify-content: space-between; font-size: 10px; color: var(--text-tertiary);">
            <span>Aug 17</span>
            <span>Aug 24</span>
            <span>Aug 31</span>
            <span>Sep 7</span>
            <span>Sep 14</span>
          </div>

        </div>
      </div>

      <!-- Muscle Group Breakdown -->
      <div>
        <h2 class="text-base font-bold text-primary mb-4">Muscle Group Breakdown</h2>
        <div class="flex items-center gap-6">
          
          <!-- CSS Donut Chart (Mock) -->
          <div style="width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(
            var(--accent-primary) 0% 28%, 
            #3B82F6 28% 50%, 
            #60A5FA 50% 68%, 
            #93C5FD 68% 84%, 
            #BFDBFE 84% 94%, 
            #E5E7EB 94% 100%
          ); position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="width: 80px; height: 80px; background: var(--bg-primary); border-radius: 50%;"></div>
          </div>
          
          <!-- Legend -->
          <div class="flex-col w-full gap-2">
            
            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent-primary);"></div>
                <span class="text-primary font-medium">Chest</span>
              </div>
              <span class="text-secondary">28%</span>
            </div>

            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #3B82F6;"></div>
                <span class="text-primary font-medium">Back</span>
              </div>
              <span class="text-secondary">22%</span>
            </div>

            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #60A5FA;"></div>
                <span class="text-primary font-medium">Legs</span>
              </div>
              <span class="text-secondary">18%</span>
            </div>
            
            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #93C5FD;"></div>
                <span class="text-primary font-medium">Shoulders</span>
              </div>
              <span class="text-secondary">16%</span>
            </div>
            
            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #BFDBFE;"></div>
                <span class="text-primary font-medium">Arms</span>
              </div>
              <span class="text-secondary">10%</span>
            </div>
            
            <div class="flex items-center justify-between text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
              <div class="flex items-center gap-2">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #E5E7EB;"></div>
                <span class="text-primary font-medium">Others</span>
              </div>
              <span class="text-secondary">6%</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  `;
};

export const init = () => {
  if (window.lucide) window.lucide.createIcons();
};
