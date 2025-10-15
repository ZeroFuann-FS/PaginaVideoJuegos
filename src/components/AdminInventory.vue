<template>
  <section class="inventory-section">
    <h2>Gestión de Inventario</h2>
    <div class="inventory-list">
      <div v-for="item in inventory" :key="item.id" class="inventory-item">
        <span>{{ products.find(p => p.id === item.id)?.name }}</span>
        <span>Stock: {{ item.stock }}</span>
        <div class="stock-controls">
          <button @click="updateStock(item.id, item.stock - 1)" :disabled="item.stock === 0">-</button>
          <input type="number" v-model.number="item.stock" @change="setStock(item.id, item.stock)">
          <button @click="updateStock(item.id, item.stock + 1)">+</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inventory, products } from '../store.js';

function updateStock(productId, newStock) {
  const item = inventory.find(i => i.id === productId);
  if (item && newStock >= 0) {
    item.stock = newStock;
  }
}

function setStock(productId, newStock) {
  const item = inventory.find(i => i.id === productId);
  if (item && newStock >= 0) {
    item.stock = Math.floor(newStock); // Ensure it's an integer
  }
}
</script>

<style scoped>
.inventory-section {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.inventory-list {
  max-height: 500px;
  overflow-y: auto;
}
.inventory-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}
.stock-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.stock-controls input {
  width: 60px;
  text-align: center;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
.inventory-item button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}
.inventory-item button:disabled {
  background: var(--secondary-color);
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .inventory-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
