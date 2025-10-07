<template>
  <header>
    <nav class="navbar">
      <router-link to="/" class="nav-logo">T&G</router-link>
      <ul class="nav-menu">
        <li class="nav-item"><router-link to="/" class="nav-link">Inicio</router-link></li>
        <li class="nav-item"><router-link to="/contact" class="nav-link">Contacto</router-link></li>
        <li class="nav-item"><router-link to="/location" class="nav-link">Ubicación</router-link></li>
      </ul>
      <div class="nav-right">
        <button id="theme-toggle" class="theme-toggle" @click="toggleTheme">{{ theme === 'light' ? '🌙' : '☀️' }}</button>
        <router-link to="/cart" class="nav-cart">
          Carrito <span id="cart-count">{{ cart.totalItems }}</span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { cart } from '../store.js';

const theme = ref('dark');

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', theme.value);
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
/* Scoped styles for Header.vue */
</style>