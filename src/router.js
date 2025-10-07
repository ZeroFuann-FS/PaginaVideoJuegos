import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Cart from './components/Cart.vue';
import Contact from './components/Contact.vue';
import Location from './components/Location.vue';
import Checkout from './components/Checkout.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
  { path: '/contact', component: Contact },
  { path: '/location', component: Location },
  { path: '/checkout', component: Checkout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;