export const renderTargetIndicator = (targetStr) => {
  return `
    <div class="text-sm text-secondary mb-4">
      <span class="font-medium text-tertiary mr-2">Target:</span>
      <span class="text-primary">${targetStr}</span>
      <span class="badge text-xs ml-2" style="background: rgba(6, 214, 160, 0.15); color: var(--accent-secondary); padding: 2px 8px; border-radius: 4px;">PROGRESSING &uarr;</span>
    </div>
  `;
};
