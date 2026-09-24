import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './animations.js';

gsap.registerPlugin(ScrollTrigger);

export const initParallax = () => {
  if (isReducedMotion()) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');

  parallaxElements.forEach(element => {
    // data-parallax="0.2" means move at 20% scroll speed
    const speed = parseFloat(element.getAttribute('data-parallax')) || 0.1;
    
    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true // ties animation strictly to scroll bar
      }
    });
  });
};
