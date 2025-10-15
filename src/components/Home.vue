<template>
  <main class="container">
    <div class="hero">
      <div class="hero-content">
        <h1>Tech & Games</h1>
        <p>Tu tienda de tecnología y videojuegos</p>
        <router-link to="/shop" class="cta-button">Explorar Tienda</router-link>
      </div>
      <div class="hero-products">
        <div class="animated-image" v-for="(product, index) in featuredProducts.slice(0, 3)" :key="product.id">
          <img :src="product.image" :alt="product.name" class="showcase-image" :style="{ animationDelay: `${(index + 1) * 0.5}s` }">
        </div>
      </div>
    </div>
    <div class="categories-section">
      <h2>Categorías</h2>
      <div class="categories-grid">
        <router-link v-for="category in categories" :key="category.name" :to="`/shop?category=${category.name}`" class="category-card">
          <h3>{{ category.name }}</h3>
          <p>{{ category.subcategories.length }} subcategorías</p>
        </router-link>
      </div>
    </div>
    <div class="product-grid">
      <h2>Productos Destacados</h2>
      <div id="product-container">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card image-only">
          <img :src="product.image" :alt="product.name">
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { cart, products } from '../store.js';

const categories = computed(() => {
  const cats = {};
  products.forEach(product => {
    if (!cats[product.category]) {
      cats[product.category] = { name: product.category, subcategories: new Set() };
    }
    cats[product.category].subcategories.add(product.subcategory);
  });
  return Object.values(cats).map(cat => ({
    name: cat.name,
    subcategories: Array.from(cat.subcategories)
  }));
});

const featuredProducts = computed(() => products.slice(0, 6)); // Show first 6 as featured

function addToCart(product) {
  cart.addItem(product);
}
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  animation: heroFadeIn 2s ease-in-out;
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: slideUp 1s ease-out 0.5s both;
}

.hero-products {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.9;
}

.animated-image {
  animation: slideInScale 2s ease-out forwards;
  opacity: 0;
  transform: scale(0.8) translateY(50px);
}

.animated-image:nth-child(1) {
  animation-delay: 0.5s;
}

.animated-image:nth-child(2) {
  animation-delay: 1s;
}

.animated-image:nth-child(3) {
  animation-delay: 1.5s;
}

.showcase-image {
  width: 250px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.showcase-image:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0,0,0,0.6);
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInScale {
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.categories-section {
  margin: 3rem 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.category-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.category-card h3 {
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.product-stock {
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero-products {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .animated-image {
    animation: slideInScale 2s ease-out forwards;
    opacity: 0;
    transform: scale(0.8) translateY(50px);
  }

  .showcase-image {
    width: 150px;
    height: 100px;
  }

  .hero {
    padding: 2rem 1rem;
  }
}

.product-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card.image-only {
  padding: 0;
  aspect-ratio: 4/3;
}

.product-card.image-only img {
  height: 100%;
  width: 100%;
}
</style>
