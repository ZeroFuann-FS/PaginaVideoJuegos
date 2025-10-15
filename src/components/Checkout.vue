<template>
  <main class="container checkout-page">
    <h1>Checkout</h1>
    <div class="checkout-layout">
      <div class="checkout-form">
        <div class="shipping-form">
          <h2>Información de Envío</h2>
          <form @submit.prevent="proceedToPayment">
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
            <button type="submit" class="cta-button">Continuar al Pago</button>
          </form>
        </div>
        <div v-if="showPayment" class="payment-options">
          <h2>Método de Pago</h2>
          <div class="payment-selection-container" :class="{ disabled: !shippingValid }">
            <div v-if="!shippingValid" class="disabled-text">Complete la información de envío primero</div>
            <div class="payment-method-options">
              <div class="payment-method">
                <input type="radio" id="credit-card" value="credit-card" v-model="selectedPaymentMethod">
                <label for="credit-card">Tarjeta de Crédito/Débito</label>
              </div>
              <div class="payment-method">
                <input type="radio" id="paypal" value="paypal" v-model="selectedPaymentMethod">
                <label for="paypal">PayPal</label>
              </div>
            </div>
            <div v-if="selectedPaymentMethod === 'credit-card'" class="payment-form">
              <div class="form-group">
                <label for="card-number">Número de Tarjeta</label>
                <input type="text" id="card-number" v-model="cardInfo.number" placeholder="1234 5678 9012 3456" required>
              </div>
              <div class="form-group">
                <label for="expiry">Fecha de Expiración</label>
                <input type="text" id="expiry" v-model="cardInfo.expiry" placeholder="MM/YY" required>
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" v-model="cardInfo.cvv" placeholder="123" required>
              </div>
            </div>
            <div v-if="selectedPaymentMethod === 'paypal'" class="payment-form">
              <p>Simulación de PayPal: Haz clic en "Pagar con PayPal" para simular el pago.</p>
              <button class="cta-button paypal-btn" @click="simulatePayPal">Pagar con PayPal</button>
            </div>
            <div class="payment-buttons-container">
              <button type="button" class="cta-button" @click="submitOrder" :disabled="!paymentValid">Realizar Pedido</button>
            </div>
          </div>
        </div>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { cart, orders, auth } from '../store.js';

const router = useRouter();

const shippingInfo = ref({
  name: '',
  address: '',
  city: '',
  country: '',
  zip: '',
});

const showPayment = ref(false);
const selectedPaymentMethod = ref('');
const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: '',
});

const shippingValid = computed(() => {
  return shippingInfo.value.name && shippingInfo.value.address && shippingInfo.value.city && shippingInfo.value.country && shippingInfo.value.zip;
});

const paymentValid = computed(() => {
  if (selectedPaymentMethod.value === 'credit-card') {
    return cardInfo.value.number && cardInfo.value.expiry && cardInfo.value.cvv;
  } else if (selectedPaymentMethod.value === 'paypal') {
    return true; // Simulated
  }
  return false;
});

function proceedToPayment() {
  if (shippingValid.value) {
    showPayment.value = true;
  }
}

function simulatePayPal() {
  alert('Simulación: Redirigiendo a PayPal... Pago aprobado.');
}

function submitOrder() {
  if (cart.items.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  if (!shippingValid.value || !paymentValid.value) {
    alert('Complete toda la información requerida.');
    return;
  }

  // Simulate payment validation
  if (selectedPaymentMethod.value === 'credit-card') {
    if (!/^\d{16}$/.test(cardInfo.value.number.replace(/\s/g, ''))) {
      alert('Número de tarjeta inválido.');
      return;
    }
  }

  // Create order
  const newOrder = {
    id: Date.now(),
    userId: auth.user?.id || 'guest',
    items: cart.items,
    total: cart.totalPrice,
    status: 'Pendiente',
    date: new Date().toISOString().split('T')[0],
    shipping: shippingInfo.value,
    paymentMethod: selectedPaymentMethod.value
  };

  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));

  alert('¡Pedido realizado con éxito!');
  cart.clearCart();
  router.push('/');
}
</script>

<style scoped>
.checkout-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.shipping-form, .payment-options {
  margin-bottom: 2rem;
}

.payment-selection-container.disabled .payment-method-options {
  opacity: 0.6;
  pointer-events: none;
}

.payment-selection-container .disabled-text {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--secondary-color);
}

.payment-selection-container.disabled .disabled-text {
  display: block;
}

.payment-selection-container .disabled-text {
  display: none;
}

.payment-method {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.payment-method:hover {
  background-color: var(--surface-color);
}

.payment-method input[type="radio"]:checked + label {
  font-weight: 600;
}

.payment-form {
  margin-top: 1rem;
}

.paypal-btn {
  background-color: #0070ba;
  margin-top: 1rem;
}

.paypal-btn:hover {
  background-color: #005ea6;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}
</style>
