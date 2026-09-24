import * as THREE from 'three';

export class ThreeScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    
    // Camera
    this.camera = new THREE.PerspectiveCamera(
      45, 
      this.container.clientWidth / this.container.clientHeight, 
      0.1, 
      100
    );
    this.camera.position.z = 10;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6C63FF, 2);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const secondaryLight = new THREE.DirectionalLight(0x06D6A0, 1);
    secondaryLight.position.set(-5, -5, 2);
    this.scene.add(secondaryLight);

    // State
    this.objects = [];
    this.isRunning = false;
    this.animationFrameId = null;

    // Mouse tracking for interaction
    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();
    
    this.setupEvents();
    this.setupVisibilityObserver();
  }

  setupEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  onMouseMove(event) {
    // Normalize mouse coordinates (-1 to +1)
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  setupVisibilityObserver() {
    // Crucial performance guard: pause rendering when canvas is off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.play();
        } else {
          this.pause();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.container);
  }

  addObject(obj, updateFn) {
    this.scene.add(obj);
    this.objects.push({ mesh: obj, update: updateFn });
  }

  animate() {
    if (!this.isRunning) return;
    
    // Smooth mouse interpolation
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Update all objects
    this.objects.forEach(item => {
      if (item.update) item.update(this.mouse);
    });

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  play() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  pause() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  destroy() {
    this.pause();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
    // Dispose resources to prevent memory leaks
    this.objects.forEach(item => {
      if(item.mesh.geometry) item.mesh.geometry.dispose();
      if(item.mesh.material) item.mesh.material.dispose();
    });
    this.renderer.dispose();
  }
}
