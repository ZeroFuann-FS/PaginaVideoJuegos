import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Shop from './components/Shop.vue';
import Cart from './components/Cart.vue';
import Contact from './components/Contact.vue';
import Location from './components/Location.vue';
import Checkout from './components/Checkout.vue';
import Login from './components/Login.vue';
import AdminLogin from './components/AdminLogin.vue';
import UserProfile from './components/UserProfile.vue';
import AdminDashboard from './components/AdminDashboard.vue';
import AdminPanel from './components/AdminPanel.vue';
import AdminInventory from './components/AdminInventory.vue';
import AdminOrders from './components/AdminOrders.vue';
import AdminData from './components/AdminData.vue';
import { auth } from './store.js';

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/cart', component: Cart },
  { path: '/contact', component: Contact },
  { path: '/location', component: Location },
  { path: '/checkout', component: Checkout },
  { path: '/login', component: Login },
  { path: '/admin-login', component: AdminLogin },
  {
    path: '/profile',
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      if (auth.isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (auth.isAdmin) {
        next();
      } else {
        next('/admin-login');
      }
    },
    children: [
      { path: '', redirect: '/admin/panel' },
      { path: 'panel', component: AdminPanel },
      { path: 'inventory', component: AdminInventory },
      { path: 'orders', component: AdminOrders },
      { path: 'data', component: AdminData },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
