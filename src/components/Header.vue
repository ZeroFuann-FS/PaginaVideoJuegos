<template>
  <header>
    <nav class="navbar">
      <router-link to="/" class="nav-logo">T&G</router-link>

      <div class="nav-container" :class="{ 'mobile-open': mobileMenuOpen }">
        <ul class="nav-menu">
          <li class="nav-item"><router-link to="/" class="nav-link" @click="closeMenu">Inicio</router-link></li>
          <li class="nav-item"><router-link to="/shop" class="nav-link" @click="closeMenu">Tienda</router-link></li>
          <li class="nav-item"><router-link to="/contact" class="nav-link" @click="closeMenu">Contacto</router-link></li>
          <li class="nav-item"><router-link to="/location" class="nav-link" @click="closeMenu">Ubicación</router-link></li>
        </ul>

        <div class="nav-right">
          <button id="theme-toggle" class="theme-toggle" @click="toggleTheme" title="Cambiar Tema">{{ theme === 'light' ? '🌙' : '☀️' }}</button>
          <router-link to="/cart" class="nav-cart" @click="closeMenu">
            Carrito <span id="cart-count">{{ cart.totalItems }}</span>
          </router-link>
          <div v-if="!auth.isLoggedIn" class="auth-links">
            <router-link to="/login" class="nav-link auth-btn" @click="closeMenu">Iniciar Sesión</router-link>
          </div>
          <div v-else class="user-menu">
            <span class="user-greeting">Hola, {{ auth.user?.name || 'Usuario' }}</span>
            <div class="user-dropdown">
              <router-link to="/profile" class="dropdown-item" @click="closeMenu">Mi Perfil</router-link>
              <button @click="logout" class="dropdown-item logout-btn">Cerrar Sesión</button>
            </div>
          </div>
          <div v-if="auth.isAdmin" class="admin-link">
            <router-link to="/admin" class="nav-link admin-btn" @click="closeMenu">Admin</router-link>
          </div>
        </div>
      </div>

      <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { cart, auth } from '../store.js';

const router = useRouter();
const theme = ref('dark');
const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMenu() {
  mobileMenuOpen.value = false;
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', theme.value);
}

function logout() {
  auth.logout();
  closeMenu();
  router.push('/');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    theme.value = 'light';
    document.body.classList.add('light-mode');
  }
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--surface-color);
  border-bottom: 1px solid var(--border-color);
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  z-index: 1100;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--primary-color);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-color);
  cursor: pointer;
  z-index: 1100;
}

/* User Menu Dropdown */
.user-menu {
  position: relative;
}
.user-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  min-width: 150px;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
.user-menu:hover .user-dropdown {
  display: block;
}
.dropdown-item {
  display: block;
  padding: 0.75rem;
  color: var(--text-color);
  text-decoration: none;
}
.dropdown-item:hover {
  background-color: var(--background-color);
}
.logout-btn {
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }

  .nav-container {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 60px; /* Space for the header */
    background-color: var(--surface-color);
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
  }

  .nav-container.mobile-open {
    display: flex;
  }

  .nav-menu {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }

  .nav-right {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .user-dropdown {
    position: static;
    display: flex;
    flex-direction: column;
    border: none;
    background: none;
    box-shadow: none;
    align-items: center;
    margin-top: 0.5rem;
  }
}
</style>
