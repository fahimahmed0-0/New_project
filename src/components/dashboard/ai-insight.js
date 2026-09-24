export const renderAiInsight = () => {
  return `
    <div class="surface-elevated p-6 rounded-lg js-stagger-card mt-8 flex items-start" style="gap: var(--spacing-4); border: 1px solid rgba(108, 99, 255, 0.2);">
      <div style="width: 40px; height: 40px; border-radius: var(--radius-full); background: var(--accent-primary-gradient); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i data-lucide="sparkles" style="color: white; width: 20px; height: 20px;"></i>
      </div>
      <div>
        <h4 class="text-sm text-secondary font-medium mb-1">AI Insight</h4>
        <p class="text-primary leading-relaxed" style="font-size: 15px;">
          "Your bench press has increased 8% over the last 4 weeks. Squat volume is trending down — consider adding an extra set on leg days."
        </p>
      </div>
    </div>
  `;
};
