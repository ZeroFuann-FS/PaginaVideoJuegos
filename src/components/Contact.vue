<template>
  <main class="container contact-page">
    <h1>Contáctanos</h1>
    <form id="contact-form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-group">
        <label for="phone">Teléfono</label>
        <input type="tel" id="phone" v-model="form.phone" required>
      </div>
      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" rows="5" v-model="form.message" required></textarea>
      </div>
      <button type="submit" class="cta-button">Enviar Mensaje</button>
    </form>
    <div v-if="showConfirmation" id="form-confirmation" style="margin-top: 20px; color: green;">
      <p>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>
    </div>
    
    <div class="social-icons">
      <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
      <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="#" target="_blank"><i class="fab fa-twitch"></i></a>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const showConfirmation = ref(false);

function submitForm() {
  showConfirmation.value = true;
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  setTimeout(() => {
    showConfirmation.value = false;
  }, 5000);
}
</script>

<style scoped>
/* Scoped styles for Contact.vue */
</style>
