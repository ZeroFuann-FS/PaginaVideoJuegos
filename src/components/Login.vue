<template>
  <main class="container login-page">
    <div class="login-form">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="cta-button">Iniciar Sesión</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p>¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
      <p>¿Eres administrador? <router-link to="/admin-login">Iniciar como Admin</router-link></p>
      <div class="demo-credentials">
        <h3>Credenciales de Prueba:</h3>
        <p>Usuario: juan@example.com | Contraseña: user123</p>
        <p>Admin: admin@techgames.com | Contraseña: admin456</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, userProfiles } from '../store.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

function login() {
  // Simulate login: check if user exists in userProfiles
  const userId = Object.keys(userProfiles).find(id => userProfiles[id].email === email.value);
  if (userId && password.value === 'user123') { // Mock password
    auth.login('user-token-' + userId, false, userProfiles[userId]);
    router.push('/');
  } else {
    error.value = 'Credenciales incorrectas';
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.login-form {
  background-color: var(--surface-color);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  max-width: 400px;
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--background-color);
  color: var(--text-color);
}

.cta-button {
  width: 100%;
  margin-top: 1rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
</style>
