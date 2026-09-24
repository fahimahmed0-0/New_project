import './styles/index.css';
import { renderShell } from './components/shell.js';
import { renderMobileNav } from './components/mobile-nav.js';
import { initRouter } from './router.js';
import { createIcons, Home, ClipboardList, BarChart2, Music, User, ArrowLeft, MoreVertical, Play, Calendar, CheckCircle2, ChevronRight, Search, Plus } from 'lucide';

// Store lucide globally so dynamic renders can use it
window.lucide = { createIcons };

renderShell();
renderMobileNav();

createIcons({
  icons: { Home, ClipboardList, BarChart2, Music, User, ArrowLeft, MoreVertical, Play, Calendar, CheckCircle2, ChevronRight, Search, Plus },
  attrs: { strokeWidth: 2 }
});

window.addEventListener('route-changed', () => {
  renderMobileNav();
  window.lucide.createIcons();
});

initRouter();
