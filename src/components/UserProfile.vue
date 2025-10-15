<template>
  <main class="container profile-page">
    <h1>Mi Perfil</h1>
    <div v-if="auth.isAdmin" class="admin-panel-link">
      <h2>Acceso de Administrador</h2>
      <p>Tienes privilegios de administrador. Accede al panel de administración para gestionar la tienda.</p>
      <router-link to="/admin" class="cta-button">Ir al Panel de Admin</router-link>
    </div>
    <div class="profile-layout">
      <section class="profile-info">
        <h2>Información Personal</h2>
        <form @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input type="text" id="name" v-model="profile.name" required>
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" id="email" v-model="profile.email" required>
          </div>
          <div class="form-group">
            <label for="theme">Tema Preferido</label>
            <select id="theme" v-model="profile.preferences.theme">
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
            </select>
          </div>
          <button type="submit" class="cta-button">Actualizar Perfil</button>
        </form>
      </section>
      <section class="order-history">
        <h2>Historial de Pedidos</h2>
        <div v-if="userOrders.length === 0" class="no-orders">
          <p>No tienes pedidos aún.</p>
        </div>
        <div v-else>
          <div v-for="order in userOrders" :key="order.id" class="order-card">
            <div class="order-header">
              <span>Pedido #{{ order.id }}</span>
              <span>{{ order.date }}</span>
              <span :class="order.status.toLowerCase()">{{ order.status }}</span>
            </div>
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <span>${{ item.price.toFixed(2) }}</span>
              </div>
            </div>
            <div class="order-total">
              <strong>Total: ${{ order.total.toFixed(2) }}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { auth, userProfiles, orders } from '../store.js';

const profile = ref({ ...auth.user });

const userOrders = computed(() => {
  return orders.filter(order => order.userId === auth.user?.id || 'user1'); // Mock userId
});

function updateProfile() {
  if (auth.user) {
    userProfiles[auth.user.id || 'user1'] = { ...profile.value };
    localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
    alert('Perfil actualizado');
  }
}

onMounted(() => {
  if (!auth.isLoggedIn) {
    // Redirect to login if not logged in
    window.location.href = '/login';
  }
});
</script>

<style scoped>
.profile-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.profile-info, .order-history {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--background-color);
  color: var(--text-color);
}

.order-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 600;
}

.order-header span:last-child {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.order-header span.entregado {
  background-color: #28a745;
  color: white;
}

.order-header span.pendiente {
  background-color: #ffc107;
  color: black;
}

.order-items {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.order-total {
  text-align: right;
  font-size: 1.1rem;
}

.no-orders {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}

.admin-panel-link {
  background-color: var(--tertiary-color);
  color: var(--complement-dark);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}
.admin-panel-link h2 {
  margin-top: 0;
  color: var(--complement-dark);
}
.admin-panel-link .cta-button {
  background-color: var(--complement-dark);
  color: white;
  margin-top: 1rem;
}
</style>
