export const render = () => {
  return `
    <div class="page-content js-fade-up flex items-center justify-center h-full">
      <div class="text-secondary">
        <i data-lucide="music" style="width: 48px; height: 48px; margin: 0 auto; display: block; opacity: 0.5;"></i>
      </div>
    </div>
  `;
};

export const init = () => {
  if (window.lucide) window.lucide.createIcons();
};
