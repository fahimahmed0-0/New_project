import { isReducedMotion } from './animations.js';

export class ParticleSystem {
  constructor(containerId) {
    // Performance guard: do not initialize if mobile or reduced motion
    if (isReducedMotion() || window.innerWidth < 768) {
      console.log('Particles disabled: reduced motion or mobile device detected.');
      return;
    }

    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    // Make canvas overlay the container but ignore pointer events
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
    
    this.container.appendChild(this.canvas);
    
    this.particles = [];
    this.particleCount = 40; // Keep it subtle and performant
    this.isRunning = false;

    this.resize();
    this.initParticles();
    
    window.addEventListener('resize', this.resize.bind(this));
    this.setupVisibilityObserver();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  setupVisibilityObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.play();
      } else {
        this.pause();
      }
    }, { threshold: 0.1 });
    
    observer.observe(this.container);
  }

  draw() {
    if (!this.isRunning || !this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw subtle glowing dots moving upwards
    this.ctx.fillStyle = '#6C63FF';
    
    this.particles.forEach(p => {
      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Move up
      p.y -= p.speedY;
      
      // Wrap around
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
    });
    
    this.animationId = requestAnimationFrame(this.draw.bind(this));
  }

  play() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.draw();
    }
  }

  pause() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
