import { productos } from './data.js';

// --- VARIABLES GLOBALES ---
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// --- SELECCIÓN DE ELEMENTOS ---
const productsContainer = document.getElementById('products-container');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.getElementById('cart-count');
const themeToggleBtn = document.getElementById('theme-toggle');

// --- UTILIDADES ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount);
};

// --- ALERTA ---
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- RENDERIZADO DE PRODUCTOS ---
function renderProducts(productsList) {
    // 1. Limpiamos el contenedor
    productsContainer.innerHTML = '';

    // 2. VALIDACIÓN:
    if (productsList.length === 0) {
        
        productsContainer.classList.add('is-empty');

        productsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>No encontramos productos</h3>
                <p>Intenta ajustar el filtro de precio o categoría.</p>
            </div>
        `;
        return; 
    }

    // 3. Si hay productos: QUITAMOS LA CLASE
    productsContainer.classList.remove('is-empty');

    productsList.forEach(product => {
        const card = document.createElement('article');
        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.nombre}</h3>
                <p class="product-category">${product.categoria}</p>
                <div class="product-footer">
                    <span class="price">${formatCurrency(product.precio)}</span>
                    <button class="btn-add" data-id="${product.id}">
                        <i class="fa-solid fa-bag-shopping"></i> Agregar
                    </button>
                </div>
            </div>
        `;

        productsContainer.appendChild(card);
    });

    
    addEventToButtons();
}

// --- FILTROS ---
function filterProducts() {
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);

    // Actualizamos el número visual del slider
    priceValue.textContent = formatCurrency(maxPrice);

    // Filtramos
    const filtered = productos.filter(product => {
        const categoryMatch = category === 'all' || product.categoria === category;
        const priceMatch = product.precio <= maxPrice;
        return categoryMatch && priceMatch;
    });

    renderProducts(filtered);
}

// --- LÓGICA DEL CARRITO ---
function addEventToButtons() {
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const product = productos.find(p => p.id === id);
    const existingItem = carrito.find(item => item.id === id);

    if (existingItem) {
        existingItem.cantidad++;
    } else {
        carrito.push({ ...product, cantidad: 1 });
    }

    updateCart();
    showToast(`Agregaste <strong>${product.nombre}</strong> al carrito`);
}

function removeFromCart(id) {
    carrito = carrito.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    const totalCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCountElement.textContent = totalCount;
    renderCartItems();
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg" style="text-align:center; padding:1rem; color: #64748b;">Tu carrito está vacío.</p>';
        cartTotalElement.textContent = formatCurrency(0);
    } else {
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            totalPrice += subtotal;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <div>
                    <h4 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${item.nombre}</h4>
                    <p style="font-size: 0.85rem; color: #64748b;">${formatCurrency(item.precio)} x ${item.cantidad}</p>
                    <p style="font-weight: bold; margin-top: 0.2rem;">${formatCurrency(subtotal)}</p>
                    <button class="remove-btn" data-id="${item.id}" style="color: #ef4444; border: none; background: none; cursor: pointer; font-size: 0.8rem; margin-top: 5px; display: flex; align-items: center; gap: 0.3rem;">
                        <i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
        cartTotalElement.textContent = formatCurrency(totalPrice);
    }
    
    // Eventos eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').dataset.id);
            removeFromCart(id);
        });
    });
}

// --- EVENT LISTENERS ---
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('input', filterProducts);

cartBtn.addEventListener('click', () => cartOverlay.classList.add('show'));
closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('show'));
cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) cartOverlay.classList.remove('show');
});

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggleBtn.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productos);
    updateCart();
    
    // Inicializar el valor del slider al cargar
    if(priceValue && priceFilter) {
        priceValue.textContent = formatCurrency(parseInt(priceFilter.value));
    }
});