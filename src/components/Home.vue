<template>
  <main class="container">
    <div class="hero">
      <div class="hero-content">
        <h1>Tech & Games</h1>
        <p>Tu tienda de tecnología y videojuegos</p>
      </div>
    </div>
    <div class="product-grid">
      <h2>Productos Destacados</h2>
      <div id="product-container">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name">
          <div class="product-card-content">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="product-price">${{ product.price.toFixed(2) }}</div>
            <button class="cta-button add-to-cart-btn" @click="addToCart(product)">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { cart } from '../store.js';

const products = ref([
  {
    id: 1,
    name: 'PlayStation 5',
    description: 'Consola de última generación con SSD de ultra alta velocidad.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Xbox Series X',
    description: 'La Xbox más rápida y potente de la historia.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1621259182952-08a122ff6c2c?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED',
    description: 'Juega en casa o en cualquier lugar con una pantalla vibrante.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Tarjeta Gráfica RTX 4080',
    description: 'Rendimiento extremo para gaming y creación de contenido.',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1682211390292-d68b83903532?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Monitor Gamer 4K 144Hz',
    description: 'Visuales impresionantes con una fluidez increíble.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1627824439323-a9b473e76348?q=80&w=1932&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Teclado Mecánico RGB',
    description: 'Respuesta táctil y personalización de colores.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1614624532983-7859163553a6?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'La secuela épica de Breath of the Wild.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1694122341224-00e4fe1d0a39?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 8,
    name: 'Elden Ring',
    description: 'Un vasto mundo de fantasía te espera.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1678043639454-85704428453f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 9,
    name: 'Cyberpunk 2077',
    description: 'Una historia de acción y aventura en Night City.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1690272497980-1abbff59334a?q=80&w=2070&auto=format&fit=crop'
  }
]);

function addToCart(product) {
  cart.addItem(product);
}
</script>

<style scoped>
/* Scoped styles for Home.vue */
</style>
