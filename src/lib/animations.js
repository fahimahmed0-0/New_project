import gsap from 'gsap';

// Helper to check for reduced motion preference
export const isReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reusable animation modules
export const animations = {
  fadeInUp: (element, delay = 0) => {
    if (isReducedMotion()) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }
    
    gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out", 
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  },

  countUp: (element, targetValue, duration = 1.5) => {
    if (isReducedMotion()) {
      element.innerText = targetValue;
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        // Format based on decimal or integer
        element.innerText = Number.isInteger(targetValue) ? 
          Math.round(obj.val) : 
          obj.val.toFixed(1);
      },
      scrollTrigger: {
        trigger: element,
        start: "top 90%"
      }
    });
  },

  chartReveal: (chartContainer) => {
    if (isReducedMotion()) return;
    
    gsap.fromTo(chartContainer,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: {
          trigger: chartContainer,
          start: "top 80%"
        }
      }
    );
  },

  progressFill: (barElement, targetPercentage) => {
    if (isReducedMotion()) {
      gsap.set(barElement, { width: `${targetPercentage}%` });
      return;
    }

    gsap.fromTo(barElement,
      { width: "0%" },
      { width: `${targetPercentage}%`, duration: 1, ease: "power3.inOut",
        scrollTrigger: {
          trigger: barElement,
          start: "top 90%"
        }
      }
    );
  },

  staggerCards: (containerSelector, cardSelector) => {
    if (isReducedMotion()) {
      gsap.set(`${containerSelector} ${cardSelector}`, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(`${containerSelector} ${cardSelector}`,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
        scrollTrigger: {
          trigger: containerSelector,
          start: "top 85%"
        }
      }
    );
  },

  prCelebration: () => {
    if (isReducedMotion()) return;
    // We will hook this up to the particles system for a golden flash
    const event = new CustomEvent('trigger-pr-celebration');
    window.dispatchEvent(event);
  },

  workoutComplete: (modalElement) => {
    if (isReducedMotion()) {
      gsap.set(modalElement, { opacity: 1, display: 'block' });
      return;
    }
    
    gsap.fromTo(modalElement,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
    );
  }
};
