# 🛒 Tienda Universitaria UNAL - Catálogo Interactivo

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-success)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

Catálogo interactivo de productos de la UNAL.

## 🚀 Demo en Vivo

Puedes ver el proyecto funcionando aquí:
**[🔗 Ver Tienda UN en GitHub Pages](https://juanpbchb.github.io/Tienda_UN/)**


## ✨ Características Principales

* **Diseño Completamente Responsivo:** Por medio de **CSS Grid** ajusta la cantidad de columnas de productos según la resolución de la pantalla.
* **Modo Oscuro / Claro:** Implementación de theme switching con persistencia visual, ajustando toda la paleta de colores (textos, fondos, tarjetas y alertas) para una visualización cómoda en cualquier entorno.
* **Filtrado:**
    * Filtro por **Categoría** mediante select (Ropa, Tecnología, Accesorios, Papelería y Recipiente).
    * Filtro por **Precio** mediante un slider interactivo.
* **Carrito de Compras:**
    * Agregar productos con validación visual.
    * Cálculo automático de subtotales y total.
    * Persistencia de datos (LocalStorage) para no perder el carrito al recargar.
* **Feedback Visual (UX):**
    * **Alertas Toast:** Notificaciones emergentes al agregar productos.
    * **Estados Vacíos (Empty States):** Mensaje visual cuando las búsquedas o filtros no arrojan resultados.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado bajo la filosofía **Vanilla JS**, sin dependencias ni frameworks externos, para demostrar dominio de los fundamentos web.

* **HTML5:** Estructura semántica.
* **CSS3:** Variables CSS, Flexbox, CSS Grid y Media Queries.
* **JavaScript:** Lógica de filtrado, manipulación del DOM y gestión del LocalStorage.

## 🎨 Créditos y Recursos

* **Diseño de Interfaz:** Inspirado en la identidad visual institucional de la UNAL (colores vino tinto y dorado).
* **Generación de Imágenes:** Los assets gráficos y productos mostrados fueron generados utilizando inteligencia artificial con **Nano Banana** de **Google Gemini**.
* **Iconografía:** [FontAwesome](https://fontawesome.com/).

## 📂 Estructura del Proyecto

```text
Tienda_UN/
├── assets/
│   └── images/      # Imágenes optimizadas de los productos
├── css/
│   └── styles.css   # Estilos globales y responsivos
├── js/
│   ├── data.js      # Base de datos simulada (Array de objetos JSON)
│   └── main.js      # Lógica principal de la aplicación
├── index.html       # Punto de entrada
└── README.md        # Documentación