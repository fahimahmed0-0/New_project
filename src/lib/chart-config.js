import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const getExternalTooltipHandler = () => {
  return (context) => {
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.className = 'chart-tooltip';
      document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(b => b.lines);

      let innerHtml = '<div style="font-weight: 600; margin-bottom: 4px; color: var(--text-secondary); font-size: 12px;">';
      titleLines.forEach(title => {
        innerHtml += '<span>' + title + '</span>';
      });
      innerHtml += '</div><div>';
      
      bodyLines.forEach((body, i) => {
        const colors = tooltipModel.labelColors[i];
        const colorSquare = `<span style="display:inline-block; width:10px; height:10px; margin-right:6px; background-color:${colors.backgroundColor}; border-radius:2px;"></span>`;
        innerHtml += `<div style="display: flex; align-items: center; font-weight: 700;">${colorSquare} ${body}</div>`;
      });
      innerHtml += '</div>';

      tooltipEl.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
    // Offset slightly so cursor doesn't block it
    tooltipEl.style.transform = 'translate(-50%, -120%)';
  };
};

export const setupChartDefaults = () => {
  // Global defaults for premium dark mode look
  Chart.defaults.color = getCssVar('--text-secondary') || '#8A8A93';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.scale.grid.color = getCssVar('--white-5') || 'rgba(255, 255, 255, 0.05)';
  Chart.defaults.scale.grid.borderColor = 'transparent';
  
  Chart.defaults.plugins.tooltip.enabled = false; // Disable native tooltip
  Chart.defaults.plugins.tooltip.external = getExternalTooltipHandler(); // Use custom CSS tooltip
  Chart.defaults.plugins.legend.display = false; // Hide legend for cleaner look
};

// Helper function to extract CSS variables to enforce zero ad-hoc rule
export const getCssVar = (varName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

export const hexToRgba = (hex, alpha) => {
  if (!hex) return `rgba(108, 99, 255, ${alpha})`; // fallback to primary
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
