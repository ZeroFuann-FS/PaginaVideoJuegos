<template>
  <section class="orders-section">
    <h2>Seguimiento de Pedidos</h2>
    <div class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-info">
          <span>Pedido #{{ order.id }}</span>
          <span>{{ order.date }}</span>
          <span :class="getStatusClass(order.status)">{{ order.status }}</span>
        </div>
        <div class="order-actions">
          <select v-model="order.status" @change="updateOrderStatus(order.id, order.status)">
            <option>Pendiente</option>
            <option>Enviado</option>
            <option>Entregado</option>
            <option>Cancelado</option>
          </select>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { orders } from '../store.js';

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
}

function getStatusClass(status) {
  return status.toLowerCase().replace(' ', '-');
}
</script>

<style scoped>
.orders-section {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.orders-list {
  max-height: 500px;
  overflow-y: auto;
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}
.order-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.order-actions select {
  padding: 0.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
.pendiente { color: #ffc107; }
.enviado { color: #17a2b8; }
.entregado { color: #28a745; }
.cancelado { color: #dc3545; }

@media (max-width: 768px) {
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
