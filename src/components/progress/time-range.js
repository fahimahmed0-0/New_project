export const renderTimeRange = () => {
  return `
    <select id="timeframe-select" class="input-control" style="width: auto; padding-right: var(--spacing-8); font-weight: 500;">
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
      <option value="all">All Time</option>
    </select>
  `;
};
