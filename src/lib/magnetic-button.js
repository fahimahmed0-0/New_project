import gsap from 'gsap';
import { isReducedMotion } from './animations.js';

export const initMagneticButtons = () => {
  if (isReducedMotion()) return;

  const buttons = document.querySelectorAll('.btn-magnetic');

  buttons.forEach(btn => {
    // We create an invisible larger hit area so the magnetic pull starts earlier
    const magnetLayer = document.createElement('div');
    magnetLayer.style.position = 'absolute';
    magnetLayer.style.top = '-20px';
    magnetLayer.style.left = '-20px';
    magnetLayer.style.right = '-20px';
    magnetLayer.style.bottom = '-20px';
    magnetLayer.style.zIndex = '-1';
    
    // Ensure button is position relative to contain the hit area
    if (getComputedStyle(btn).position === 'static') {
      btn.style.position = 'relative';
    }
    
    btn.appendChild(magnetLayer);

    const moveMagnet = (event) => {
      const rect = btn.getBoundingClientRect();
      // Calculate mouse position relative to button center (-1 to 1)
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      // Magnetic strength (max pixels to move)
      const strength = 15; 
      
      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const resetMagnet = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)" // Snap back feeling
      });
    };

    btn.addEventListener('mousemove', moveMagnet);
    btn.addEventListener('mouseleave', resetMagnet);
  });
};
