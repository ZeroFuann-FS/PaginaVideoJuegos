<template>
  <main class="container cart-page">
    <h1>Tu Carrito</h1>
    <div v-if="cart.items.length === 0" class="cart-empty-message">
      <p>Tu carrito está vacío.</p>
    </div>
    <div v-else>
      <div id="cart-container">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name">
          <div class="cart-item-info">
            <h3>{{ item.name }}</h3>
            <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="cart-item-quantity">
            <input type="number" :value="item.quantity" @change="updateQuantity(item.id, $event.target.value)" min="1" class="quantity-input">
          </div>
          <div class="cart-item-subtotal">${{ (item.price * item.quantity).toFixed(2) }}</div>
          <button class="remove-item-btn" @click="removeItem(item.id)">Eliminar</button>
        </div>
      </div>
      <div id="cart-summary" class="cart-summary">
        <h2>Resumen del Pedido</h2>
        <div class="summary-line">
          <span>Subtotal:</span>
          <span>${{ cart.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-line">
          <span>Envío:</span>
          <span>Gratis</span>
        </div>
        <hr>
        <div class="summary-line">
          <strong>Total:</strong>
          <strong id="cart-total">${{ cart.totalPrice.toFixed(2) }}</strong>
        </div>
        <router-link to="/checkout" class="cta-button" style="width: 100%; margin-top: 1rem;">Proceder al Pago</router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { cart } from '../store.js';

function updateQuantity(productId, quantity) {
  const newQuantity = parseInt(quantity);
  if (newQuantity > 0) {
    cart.updateQuantity(productId, newQuantity);
  }
}

function removeItem(productId) {
  cart.removeItem(productId);
}
</script>

<style scoped>
/* Scoped styles for Cart.vue */
</style>
