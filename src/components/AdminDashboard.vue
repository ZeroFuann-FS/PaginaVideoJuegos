<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <nav class="admin-nav">
        <router-link to="/admin/panel" class="nav-item">
          <span class="icon">📊</span>
          <span class="text">Panel Principal</span>
        </router-link>
        <router-link to="/admin/inventory" class="nav-item">
          <span class="icon">📦</span>
          <span class="text">Inventario</span>
        </router-link>
        <router-link to="/admin/orders" class="nav-item">
          <span class="icon">🚚</span>
          <span class="text">Pedidos</span>
        </router-link>
        <router-link to="/admin/data" class="nav-item">
          <span class="icon">💾</span>
          <span class="text">Datos</span>
        </router-link>
      </nav>
    </aside>
    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// No script needed for the layout component
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: calc(100vh - 80px); /* Adjust 80px based on header height */
}

.admin-sidebar {
  width: 250px;
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: var(--text-color);
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: var(--background-color);
}

.nav-item.router-link-exact-active {
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
}

.nav-item .icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}

.admin-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }
  .admin-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
  }
  .admin-nav {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  .nav-item .text {
    display: none; /* Hide text on small screens, show only icon */
  }
  .nav-item {
    justify-content: center;
  }
  .nav-item .icon {
    margin-right: 0;
  }
}
</style>