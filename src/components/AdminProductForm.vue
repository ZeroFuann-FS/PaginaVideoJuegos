<template>
  <div class="product-form-container">
    <h2>{{ isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre del Producto</label>
        <input type="text" id="name" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea id="description" v-model="product.description" rows="3" required></textarea>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label for="price">Precio</label>
          <input type="number" id="price" v-model.number="product.price" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="stock">Stock</label>
          <input type="number" id="stock" v-model.number="product.stock" required>
        </div>
      </div>
      <div class="form-group">
        <label for="image">URL de la Imagen</label>
        <input type="url" id="image" v-model="product.image" required>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label for="category">Categoría</label>
          <input type="text" id="category" v-model="product.category" required>
        </div>
        <div class="form-group">
          <label for="subcategory">Subcategoría</label>
          <input type="text" id="subcategory" v-model="product.subcategory" required>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="cta-button">{{ isEditing ? 'Actualizar' : 'Crear' }}</button>
        <button type="button" class="cta-button secondary" @click="$emit('close')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialProduct: {
    type: Object,
    default: () => ({
      id: null,
      name: '',
      description: '',
      price: 0,
      image: '',
      category: '',
      subcategory: '',
      stock: 0,
    })
  }
});

const emit = defineEmits(['submit', 'close']);

const product = ref({ ...props.initialProduct });
const isEditing = ref(props.initialProduct && props.initialProduct.id !== null);

watch(() => props.initialProduct, (newVal) => {
  product.value = { ...newVal };
  isEditing.value = newVal && newVal.id !== null;
}, { deep: true });

function handleSubmit() {
  emit('submit', { ...product.value });
}
</script>

<style scoped>
.product-form-container {
  background-color: var(--surface-color);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-top: 2rem;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input, .form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--background-color);
  color: var(--text-color);
}
.form-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.cta-button.secondary {
  background-color: var(--secondary-color);
  color: var(--complement-dark);
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
