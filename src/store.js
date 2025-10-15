import { reactive } from 'vue';

// Auth state simulation
export const auth = reactive({
  isLoggedIn: !!localStorage.getItem('authToken'),
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,

  login(token, isAdmin = false, user = null) {
    this.isLoggedIn = true;
    this.isAdmin = isAdmin;
    this.user = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAdmin', isAdmin.toString());
    if (user) localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
  }
});

export const cart = reactive({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addItem(product) {
    if (!auth.isLoggedIn) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
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

  clearCart() {
    this.items = [];
    this.save();
  },

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
});

// Products with categories and subcategories
export const products = reactive([
  // Consolas
  {
    id: 1,
    name: 'PlayStation 5',
    description: 'Consola de última generación con SSD de ultra alta velocidad.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2022&auto=format&fit=crop',
    category: 'Consolas',
    subcategory: 'Consolas PlayStation',
    stock: 10
  },
  {
    id: 2,
    name: 'Xbox Series X',
    description: 'La Xbox más rápida y potente de la historia.',
    price: 499.99,
    image: 'https://imgs.search.brave.com/kTlbsDWdf7YLC3iwaTpwemRqG-2GwCWqq8yHgLL9hUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/ZHlubWVkaWEtMS5t/aWNyb3NvZnQuY29t/L2lzL2ltYWdlL21p/Y3Jvc29mdGNvcnAv/NjY3NDM4OTBfSGln/aGxpZ2h0X1Zpc0lE/XzMwMDB4MTY4MjpW/UDItODU5eDU0MA',
    category: 'Consolas',
    subcategory: 'Consolas Xbox',
    stock: 8
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED',
    description: 'Juega en casa o en cualquier lugar con una pantalla vibrante.',
    price: 349.99,
    image: 'https://imgs.search.brave.com/aRVKLmP2eGXonmrc7l6FyEXJP0hhsiXrI-3FgRWFQvw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMubmludGVuZG9s/aWZlLmNvbS9jOTM2/ODllNTA0ZGM1L25p/bnRlbmRvLXN3aXRj/aC1vbGVkLW1vZGVs/LjkwMHguanBn',
    category: 'Consolas',
    subcategory: 'Consolas Nintendo',
    stock: 15
  },
  // Componentes
  {
    id: 4,
    name: 'Tarjeta Gráfica RTX 4080',
    description: 'Rendimiento extremo para gaming y creación de contenido.',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2071&auto=format&fit=crop',
    category: 'Componentes',
    subcategory: 'Tarjetas gráficas',
    stock: 5
  },
  // Accesorios
  {
    id: 5,
    name: 'Auriculares Gaming RGB',
    description: 'Sonido inmersivo con iluminación personalizable.',
    price: 129.99,
    image: 'https://imgs.search.brave.com/zJQW_2eDShnvHZEnYRXXPprq26766tXjPnMDPX2ERWE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWxl/Y3Rzb3VuZC5jb20u/bXgvY2RuL3Nob3Av/ZmlsZXMvYXVkaWZv/bm9zLWdhbWVyLXNl/bGVjdC1nYW1pbmct/ZmxhbWUtYWxhbWJy/aWNvcy1zZy1oNS1t/aWNyb2Zvbm8taW50/ZWdyYWRvLWx1ei1y/Z2ItNzc1OTUyXzEw/ODB4MTA4MC5qcGc_/dj0xNzEzOTI1Mjcz',
    category: 'Accesorios',
    subcategory: 'Auriculares gaming',
    stock: 20
  },
  // Videojuegos
  {
    id: 6,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'La secuela épica de Breath of the Wild.',
    price: 69.99,
    image: 'https://imgs.search.brave.com/dctTDVlS9c01H6nnTvdCeZJQfx0awMqLumHy097KOoU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMtcHJkLmlnbmlt/Z3MuY29tLzIwMjIv/MDkvMTQvemVsZGEt/dGVhcnMtb2YtdGhl/LWtpbmdkb20tYnV0/dG9uLTJrLTE2NjMx/Mjc4MTg3NzcuanBn/P2Nyb3A9MToxLHNt/YXJ0JmZvcm1hdD1q/cGcmYXV0bz13ZWJw/JnF1YWxpdHk9ODA',
    category: 'Videojuegos',
    subcategory: 'Juegos de Nintendo',
    stock: 12
  },
  {
    id: 7,
    name: 'Elden Ring',
    description: 'Un vasto mundo de fantasía te espera.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1644861837868-981a3a8c0a5a?q=80&w=2070&auto=format&fit=crop',
    category: 'Videojuegos',
    subcategory: 'Juegos de PlayStation',
    stock: 18
  },
  {
    id: 8,
    name: 'Cyberpunk 2077',
    description: 'Una historia de acción y aventura en Night City.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    category: 'Videojuegos',
    subcategory: 'Juegos de Xbox',
    stock: 25
  },
  {
    id: 9,
    name: 'Monitor Gamer 4K 144Hz',
    description: 'Visuales impresionantes con una fluidez increíble.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop',
    category: 'Accesorios',
    subcategory: 'Monitores',
    stock: 7
  },
  {
    id: 10,
    name: 'Teclado Mecánico RGB',
    description: 'Teclado gaming con switches mecánicos y iluminación personalizable.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop',
    category: 'Accesorios',
    subcategory: 'Teclados',
    stock: 12
  },
  {
    id: 11,
    name: 'Mouse Gaming Inalámbrico',
    description: 'Mouse ergonómico con sensor óptico de alta precisión.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1924&auto=format&fit=crop',
    category: 'Accesorios',
    subcategory: 'Mouses',
    stock: 18
  },
  {
    id: 12,
    name: 'Silla Gamer Ergonómica',
    description: 'Silla cómoda para largas sesiones de gaming con soporte lumbar.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
    category: 'Accesorios',
    subcategory: 'Sillas',
    stock: 5
  },
  {
    id: 13,
    name: 'Nintendo Switch Lite',
    description: 'Versión compacta de la consola híbrida para gaming portátil.',
    price: 199.99,
    image: 'https://imgs.search.brave.com/2qZOLUhv__F3Pl1Ui17Qt5GsHQiovoq-mNdxet4rWeo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9hcl8xNjo5/LGNfbHBhZCx3XzEy/NDAvYl93aGl0ZS9m/X2F1dG8vcV9hdXRv/L25jb20vZW5fVVMv/cHJvZHVjdHMvaGFy/ZHdhcmUvbmludGVu/ZG8tc3dpdGNoLWxp/dGUtYmx1ZS0xMTIz/ODUvMTEyMzg1LW5p/bnRlbmRvLXN3aXRj/aC1saXRlLWJsdWUt/cGFja2FnZS1mcm9u/dC0xMjAweDY3NQ',
    category: 'Consolas',
    subcategory: 'Consolas Nintendo',
    stock: 10
  },
  {
    id: 14,
    name: 'Xbox Series S',
    description: 'Consola digital de nueva generación, compacta y potente.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1974&auto=format&fit=crop',
    category: 'Consolas',
    subcategory: 'Consolas Xbox',
    stock: 8
  },
  {
    id: 15,
    name: 'Tarjeta Gráfica RTX 4070',
    description: 'Potencia gráfica de última generación para gaming 4K.',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2071&auto=format&fit=crop',
    category: 'Componentes',
    subcategory: 'Tarjetas gráficas',
    stock: 6
  },
  {
    id: 16,
    name: 'Procesador AMD Ryzen 7',
    description: 'CPU de alto rendimiento para gaming y multitarea.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
    category: 'Componentes',
    subcategory: 'Procesadores',
    stock: 9
  },
  {
    id: 17,
    name: 'Spider-Man 2',
    description: 'Aventura épica en Nueva York con Peter Parker y Miles Morales.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
    category: 'Videojuegos',
    subcategory: 'Juegos de PlayStation',
    stock: 14
  },
  {
    id: 18,
    name: 'Halo Infinite',
    description: 'El regreso del Jefe Maestro en una nueva aventura.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    category: 'Videojuegos',
    subcategory: 'Juegos de Xbox',
    stock: 16
  }
]);

export function addProduct(product) {
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push({ ...product, id: newId });
  saveProducts();
}

export function updateProduct(updatedProduct) {
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts();
  }
}

export function deleteProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts();
  }
}

function saveProducts() {
  // To persist product changes across sessions, uncomment the line below.
  // localStorage.setItem('products', JSON.stringify(products));
}

// Mock orders for users
export const orders = reactive(JSON.parse(localStorage.getItem('orders')) || []);

// Mock inventory tracking
export const inventory = reactive(products.map(p => ({ id: p.id, stock: p.stock })));

// Mock user profiles
export const userProfiles = reactive(JSON.parse(localStorage.getItem('userProfiles')) || {});

// Mock admin stats
export const adminStats = reactive({
  totalSales: 0,
  inventoryMetrics: {},
  crmData: { customers: 0, interactions: 0 },
  scmData: { suppliers: 0, stockLevels: 0 },
  erpData: { processes: 0, efficiency: 0 }
});

// Initialize mock data
if (orders.length === 0) {
  orders.push({
    id: 1,
    userId: 'user1',
    items: [{ id: 1, name: 'PlayStation 5', quantity: 1, price: 499.99 }],
    total: 499.99,
    status: 'Entregado',
    date: '2023-10-01'
  });
  localStorage.setItem('orders', JSON.stringify(orders));
}

if (Object.keys(userProfiles).length === 0) {
  userProfiles['user1'] = { name: 'Juan Pérez', email: 'juan@example.com', preferences: { theme: 'dark' } };
  localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
}

// Update admin stats
function updateAdminStats() {
  adminStats.totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  adminStats.inventoryMetrics = inventory.reduce((acc, item) => {
    acc[item.id] = item.stock;
    return acc;
  }, {});
  adminStats.crmData.customers = Object.keys(userProfiles).length;
  adminStats.scmData.stockLevels = inventory.reduce((sum, item) => sum + item.stock, 0);
  // Mock other data
  adminStats.crmData.interactions = orders.length * 5;
  adminStats.scmData.suppliers = 3;
  adminStats.erpData.processes = orders.length;
  adminStats.erpData.efficiency = 85;
}

updateAdminStats();
