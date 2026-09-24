export const renderPrBadge = (count) => {
  if (count === 0) return '';
  return `
    <span class="badge text-xs" style="background: rgba(108, 99, 255, 0.15); color: var(--accent-primary); border: 1px solid rgba(108, 99, 255, 0.3); padding: 2px 8px; border-radius: 4px;">
      <i data-lucide="trophy" style="width: 12px; height: 12px; display: inline-block; margin-right: 4px; vertical-align: -2px;"></i>
      ${count} PRs
    </span>
  `;
};
