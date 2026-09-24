export const renderPreviousPerformance = (historyStr) => {
  return `
    <div class="text-sm text-secondary mb-2">
      <span class="font-medium text-tertiary mr-2">Previous:</span>
      ${historyStr}
    </div>
  `;
};
