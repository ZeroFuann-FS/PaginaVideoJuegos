<template>
  <div>
    <div id="chat-bubble" class="chat-bubble" @click="toggleChat">
      <i class="far fa-comment-dots"></i>
    </div>
    <div id="chat-window" class="chat-window" :class="{ open: isChatOpen }">
      <div class="chat-header">
        <span>Asistente Virtual</span>
        <button id="close-chat" @click="toggleChat">&times;</button>
      </div>
      <div id="chat-body" class="chat-body">
        <div v-for="(message, index) in messages" :key="index" :class="`chat-message ${message.sender}`">
          {{ message.text }}
        </div>
      </div>
      <div class="chat-footer">
        <input type="text" id="chat-input" placeholder="Escribe un mensaje..." v-model="userInput" @keyup.enter="sendMessage">
        <button id="chat-send" @click="sendMessage">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([]);

function toggleChat() {
  isChatOpen.value = !isChatOpen.value;
}

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  appendMessage(userMessage, 'user');
  userInput.value = '';

  setTimeout(() => {
    const botResponse = getBotResponse(userMessage);
    appendMessage(botResponse, 'bot');
  }, 500);
}

function appendMessage(text, sender) {
  messages.value.push({ text, sender });
}

function getBotResponse(userInput) {
  const lcInput = userInput.toLowerCase();

  if (lcInput.includes('hola') || lcInput.includes('buenos dias') || lcInput.includes('buenas tardes')) {
    return '¡Hola! Soy el asistente virtual de Tech & Games. ¿En qué puedo ayudarte?';
  }
  if (lcInput.includes('pago') || lcInput.includes('tarjeta') || lcInput.includes('paypal')) {
    return 'Aceptamos pagos con tarjeta de crédito/débito a través de Stripe y también aceptamos pagos con PayPal.';
  }
  if (lcInput.includes('envío') || lcInput.includes('tarda') || lcInput.includes('tiempo')) {
    return 'Nuestros envíos estándar suelen tardar entre 3 y 5 días hábiles a destinos nacionales.';
  }
  if (lcInput.includes('productos') || lcInput.includes('venden')) {
    return 'Vendemos una amplia gama de productos electrónicos, consolas de videojuegos, accesorios y los últimos lanzamientos de juegos. ¡Echa un vistazo a nuestra página de inicio!';
  }
  if (lcInput.includes('contacto') || lcInput.includes('llamar') || lcInput.includes('email')) {
    return 'Puedes contactarnos a través del formulario en nuestra página de Contacto, o llamarnos al +1 (555) 123-4567.';
  }
  if (lcInput.includes('gracias') || lcInput.includes('gracia')) {
    return '¡De nada! Si tienes otra pregunta, no dudes en consultarme.';
  }

  return 'Lo siento, no he entendido tu pregunta. Por favor, intenta reformularla. También puedes usar nuestra página de Contacto para dudas más específicas.';
}

onMounted(() => {
  setTimeout(() => {
    appendMessage('¡Hola! Soy tu asistente virtual. ¿Tienes alguna pregunta?', 'bot');
  }, 1500);
});
</script>

<style scoped>
/* Scoped styles for Chatbot.vue */
</style>