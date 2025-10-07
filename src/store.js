import { reactive } from 'vue';

export const cart = reactive({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
  },

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
  },

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.save();
  },

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  get totalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
});
