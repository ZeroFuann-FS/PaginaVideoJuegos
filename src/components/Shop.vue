<template>
  <main class="container">
    <h1>Tienda</h1>
    <div class="shop-layout">
      <aside class="category-sidebar">
        <h2>Categorías</h2>
        <ul class="category-list">
          <li v-for="category in categories" :key="category.name" class="category-item">
            <button @click="selectCategory(category.name)" :class="{ active: selectedCategory === category.name }">
              {{ category.name }}
            </button>
            <ul v-if="selectedCategory === category.name" class="subcategory-list">
              <li v-for="sub in category.subcategories" :key="sub" class="subcategory-item">
                <button @click="selectSubcategory(sub)" :class="{ active: selectedSubcategory === sub }">
                  {{ sub }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
        <button @click="clearFilters" class="clear-filters-btn">Limpiar Filtros</button>
      </aside>
      <section class="products-section">
        <div class="product-grid">
          <div id="product-container">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
              <img :src="product.image" :alt="product.name">
              <div class="product-card-content">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <div class="product-price">${{ product.price.toFixed(2) }}</div>
                <div class="product-stock">Stock: {{ product.stock }}</div>
                <button class="cta-button add-to-cart-btn" @click="addToCart(product)" :disabled="product.stock === 0">
                  {{ product.stock > 0 ? 'Agregar al carrito' : 'Agotado' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { products, cart } from '../store.js';

const selectedCategory = ref('');
const selectedSubcategory = ref('');

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

const filteredProducts = computed(() => {
  let filtered = products;
  if (selectedCategory.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value);
  }
  if (selectedSubcategory.value) {
    filtered = filtered.filter(p => p.subcategory === selectedSubcategory.value);
  }
  return filtered;
});

function selectCategory(category) {
  selectedCategory.value = category;
  selectedSubcategory.value = '';
}

function selectSubcategory(sub) {
  selectedSubcategory.value = sub;
}

function clearFilters() {
  selectedCategory.value = '';
  selectedSubcategory.value = '';
}

function addToCart(product) {
  if (product.stock > 0) {
    cart.addItem(product);
  }
}
</script>

<style scoped>
.shop-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.category-sidebar {
  background-color: var(--surface-color);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-item button {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  font-weight: 600;
}

.category-item button.active {
  background-color: var(--primary-color);
  color: white;
}

.subcategory-list {
  list-style: none;
  padding-left: 1rem;
}

.subcategory-item button {
  background: none;
  border: none;
  color: var(--secondary-color);
  cursor: pointer;
  padding: 0.25rem;
  width: 100%;
  text-align: left;
}

.subcategory-item button.active {
  color: var(--tertiary-color);
  font-weight: 600;
}

.clear-filters-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: var(--tertiary-color);
  color: var(--complement-dark);
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.clear-filters-btn:hover {
  background-color: var(--secondary-color);
}

.product-stock {
  font-size: 0.9rem;
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }

  .category-sidebar {
    order: 2;
  }

  .products-section {
    order: 1;
  }
}
</style>
