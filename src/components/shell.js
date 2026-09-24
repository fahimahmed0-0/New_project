export const renderShell = () => {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Main Content Outlet -->
    <main class="page-container" id="main-content">
      <div id="route-outlet"></div>
    </main>
  `;
};
