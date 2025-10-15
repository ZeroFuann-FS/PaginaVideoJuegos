<template>
  <div>
    <div v-if="!showForm">
      <section class="data-section">
        <h2>Gestión de Productos</h2>
        <p>Añadir, editar o eliminar productos de la tienda.</p>
        <button class="cta-button" @click="openAddForm">Añadir Nuevo Producto</button>
        
        <div class="product-list">
          <div v-for="product in products" :key="product.id" class="product-list-item">
            <span class="product-name">{{ product.name }}</span>
            <div class="product-actions">
              <button @click="openEditForm(product)">Editar</button>
              <button @click="handleDeleteProduct(product.id)" class="delete">Eliminar</button>
            </div>
          </div>
        </div>
      </section>

      <section class="data-section">
        <h2>Gestión de Categorías</h2>
        <p>Próximamente: Organizar las categorías y subcategorías de productos.</p>
      </section>
    </div>

    <AdminProductForm 
      v-if="showForm" 
      :initial-product="editingProduct" 
      @submit="handleFormSubmit" 
      @close="closeForm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { products, addProduct, updateProduct, deleteProduct } from '../store.js';
import AdminProductForm from './AdminProductForm.vue';

const showForm = ref(false);
const editingProduct = ref(null);

function openAddForm() {
  editingProduct.value = null;
  showForm.value = true;
}

function openEditForm(product) {
  editingProduct.value = { ...product };
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editingProduct.value = null;
}

function handleFormSubmit(productData) {
  if (productData.id) {
    // Editing existing product
    updateProduct(productData);
  } else {
    // Adding new product
    addProduct(productData);
  }
  closeForm();
}

function handleDeleteProduct(productId) {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    deleteProduct(productId);
  }
}
</script>

<style scoped>
.data-section {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}

.product-list {
  margin-top: 2rem;
}

.product-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.product-list-item:last-child {
  border-bottom: none;
}

.product-name {
  font-weight: 600;
}

.product-actions button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-actions .delete {
  background-color: #dc3545;
  color: white;
}
</style>