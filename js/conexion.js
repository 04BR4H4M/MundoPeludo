// carrito.js

// Variable global para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(titulo, precio) {
    const producto = {
        titulo: titulo,
        precio: precio
    };
    carrito.push(producto);
    actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const contadorProductos = document.getElementById('contador-productos');
    contadorProductos.textContent = carrito.length;

    const carritoItems = document.querySelector('.carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <span>${producto.titulo}</span>
            <span>$${producto.precio.toFixed(2)}</span>
        `;
        carritoItems.appendChild(item);
    });

    calcularTotal();
}

// Función para calcular el total del carrito
function calcularTotal() {
    const carritoTotal = document.querySelector('.carrito-precio-total');
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    carritoTotal.textContent = `$${total.toFixed(2)}`;
}

// Función para mostrar u ocultar el carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.classList.toggle('mostrar');
}

// Event listeners para agregar productos al carrito
document.querySelectorAll('.boton-item').forEach(boton => {
    boton.addEventListener('click', () => {
        const titulo = boton.parentElement.querySelector('.titulo-item').textContent;
        const precio = parseFloat(boton.parentElement.querySelector('.precio-item').textContent.replace('$', ''));
        agregarAlCarrito(titulo, precio);
    });
});
