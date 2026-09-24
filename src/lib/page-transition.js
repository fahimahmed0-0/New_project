import gsap from 'gsap';
import { isReducedMotion } from './animations.js';

export const pageTransitions = {
  // Fades out current page content
  exit: (containerSelector, callback) => {
    if (isReducedMotion()) {
      if (callback) callback();
      return;
    }

    gsap.to(containerSelector, {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.in",
      onComplete: callback
    });
  },

  // Fades in new page content
  enter: (containerSelector) => {
    if (isReducedMotion()) {
      gsap.set(containerSelector, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(containerSelector,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", clearProps: "all" }
    );
  }
};
