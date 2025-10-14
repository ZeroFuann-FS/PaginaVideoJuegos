# Tech & Games - Prototipo de Sitio de Comercio Electrónico
https://zerofuann-fs.github.io/PaginaIA2/


Este es un prototipo de sitio web de comercio electrónico moderno, minimalista y responsive para vender productos electrónicos y videojuegos. El proyecto está construido puramente con HTML, CSS y JavaScript, sin necesidad de un backend o dependencias complejas.

## Características Principales

- **Página de Inicio:** Presenta un producto destacado y una cuadrícula con 9 productos de ejemplo.
- **Carrito de Compras Persistente:** Los usuarios pueden agregar productos al carrito, y la información se guarda en el `localStorage` del navegador para que no se pierda al recargar la página.
- **Gestión del Carrito:** Página dedicada para ver, modificar la cantidad o eliminar productos del carrito.
- **Proceso de Pago (Checkout):** Formulario de envío con validación y dos opciones de pago integradas en modo **sandbox**.
- **Integración de Pagos:**
    - **Stripe Checkout:** Para pagos con tarjeta de crédito/débito.
    - **PayPal JS SDK:** Para pagos utilizando una cuenta de PayPal.
- **Páginas Adicionales:** Incluye secciones de Contacto y Ubicación (con un mapa de Google Maps embebido).
- **Diseño Responsive:** Adaptado para una correcta visualización en computadoras de escritorio, tabletas y dispositivos móviles.

## Cómo Probar el Sitio en Local

Este proyecto no requiere un servidor web ni pasos de compilación. Puedes ejecutarlo directamente en tu navegador.

1.  **Clona o descarga el repositorio** en tu máquina local.
2.  **Navega a la carpeta del proyecto** donde se encuentran los archivos.
3.  **Abre el archivo `index.html`** en tu navegador web preferido (como Google Chrome, Firefox o Edge).

¡Eso es todo! Podrás navegar por el sitio, agregar productos al carrito y simular el proceso de pago.

---


## Roadmap de Mejoras Futuras

Este prototipo es una base sólida. Aquí hay algunas ideas para expandir su funcionalidad:

- **Backend Real:** Conectar el frontend a un backend (usando Node.js, Django, etc.) para gestionar productos, usuarios y pedidos en una base de datos.
- **Autenticación de Usuarios:** Añadir un sistema de inicio de sesión y registro para que los usuarios puedan guardar su información y ver su historial de pedidos.
- **Filtros y Búsqueda:** Implementar funcionalidades para buscar productos por nombre o filtrar por categoría o precio.
- **Página de Detalles del Producto:** Crear una página individual para cada producto donde se pueda ver más información, imágenes y reseñas.
- **Notificaciones por Correo:** Integrar un servicio de envío de correos para confirmar pedidos.
- **Panel de Administración:** Crear una interfaz para que el administrador del sitio pueda agregar, editar o eliminar productos fácilmente.
