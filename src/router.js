import { state } from './state.js';
import { pageTransitions } from './lib/page-transition.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let currentModule = null;

export const initRouter = () => {
  const renderRoute = async () => {
    let path = window.location.hash.slice(1) || '/';
    
    // Safety fallback for empty hash
    if (path === '') path = '/';

    // Map path to page module filename
    const moduleMap = {
      '/': 'dashboard',
      '/workout': 'workout',
      '/progress': 'progress',
      '/plateau': 'plateau',
      '/recovery': 'recovery',
      '/history': 'history',
      '/workout-summary': 'workout-summary',
      '/exercise': 'exercise-detail',
      '/routines': 'routines',
      '/library': 'library',
      '/onboarding': 'onboarding',
      '/music': 'music'
    };

    const moduleName = moduleMap[path];
    if (!moduleName) return; // 404 handling

    state.currentRoute = path;
    const outlet = document.getElementById('route-outlet');
    if (!outlet) return;

    // Fluid Page Transition Logic (Phase 3 Hook) - 150ms fade out
    pageTransitions.exit(outlet, async () => {
      
      // Cleanup previous module before destroying DOM
      if (currentModule && typeof currentModule.destroy === 'function') {
        currentModule.destroy();
      }
      
      try {
        // Render fallback UI while loading
        outlet.innerHTML = `<div class="text-center text-secondary py-8">Loading...</div>`;
        
        // Dynamically import the page module (we stub the module if it doesn't exist yet)
        // In real execution, this imports from ./pages/dashboard.js etc.
        let pageModule;
        try {
           pageModule = await import(/* @vite-ignore */ `./pages/${moduleName}.js`);
        } catch(e) {
           // Fallback for Phase 4 since pages don't exist yet
           pageModule = { 
             render: () => `<div><h1 class="text-4xl font-display mb-4 capitalize">${moduleName.replace('-', ' ')}</h1><p class="text-secondary">Content will be built in upcoming phases.</p></div>` 
           };
        }

        // Store reference for cleanup on next route change
        currentModule = pageModule;

        // Render new HTML
        outlet.innerHTML = pageModule.render();

        // Run component-specific initialization (e.g. Three.js canvas setup)
        if (typeof pageModule.init === 'function') {
          pageModule.init();
        }

        // Reset scroll to top for native app feel
        window.scrollTo(0, 0);

        // Very important: Re-initialize scroll animations after DOM changes
        ScrollTrigger.refresh();
        
        // Re-trigger enter animation - 300ms fade in
        pageTransitions.enter(outlet);

        // Trigger custom event so sidebar/mobile nav can re-render active states
        window.dispatchEvent(new CustomEvent('route-changed'));
      } catch (error) {
        console.error("Router error:", error);
      }
    });
  };

  window.addEventListener('hashchange', renderRoute);
  renderRoute();
};
