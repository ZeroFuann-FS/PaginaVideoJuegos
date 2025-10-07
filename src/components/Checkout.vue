<template>
  <main class="container checkout-page">
    <h1>Checkout</h1>
    <div class="checkout-container">
      <div class="checkout-form">
        <h2>Información de Envío</h2>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label for="name">Nombre Completo</label>
            <input type="text" id="name" v-model="shippingInfo.name" required>
          </div>
          <div class="form-group">
            <label for="address">Dirección</label>
            <input type="text" id="address" v-model="shippingInfo.address" required>
          </div>
          <div class="form-group">
            <label for="city">Ciudad</label>
            <input type="text" id="city" v-model="shippingInfo.city" required>
          </div>
          <div class="form-group">
            <label for="country">País</label>
            <input type="text" id="country" v-model="shippingInfo.country" required>
          </div>
          <div class="form-group">
            <label for="zip">Código Postal</label>
            <input type="text" id="zip" v-model="shippingInfo.zip" required>
          </div>
          <button type="submit" class="cta-button">Realizar Pedido</button>
        </form>
      </div>
      <div class="checkout-summary">
        <h2>Resumen del Pedido</h2>
        <div v-for="item in cart.items" :key="item.id" class="summary-item">
          <span>{{ item.name }} x {{ item.quantity }}</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <hr>
        <div class="summary-total">
          <strong>Total:</strong>
          <strong>${{ cart.totalPrice.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { cart } from '../store.js';

const shippingInfo = ref({
  name: '',
  address: '',
  city: '',
  country: '',
  zip: '',
});

function submitOrder() {
  if (cart.items.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  
  // Aquí se procesaría el pedido, por ejemplo, enviándolo a un servidor.
  console.log('Pedido realizado:', {
    shippingInfo: shippingInfo.value,
    items: cart.items,
    total: cart.totalPrice.value,
  });

  alert('¡Gracias por tu compra!');
  cart.clearCart();
  // Redirigir a la página de inicio o a una de confirmación
  window.location.href = '/';
}
</script>

<style scoped>
/* Scoped styles for Checkout.vue */
</style>