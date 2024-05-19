// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperamos que todos los elementos de la página carguen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Agregamos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Funcionalidad del botón sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener("click", sumarCantidad);
    }

    // Funcionalidad del botón restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

    // Funcionalidad al botón de agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener("click", agregarAlcarritoClicked);
    }

    // Funcionalidad al botón pagar
    document.getElementsByClassName("btn-pagar")[0].addEventListener("click", pagarClicked);
}

// Eliminar el item seleccionado del carrito
function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    // Actualizar el total del carrito una vez hemos eliminado el item
    actualizarTotalCarrito();

    // Función que controla si hay elementos en el carrito una vez se eliminó
    // si no hay debo ocultar el carrito
    ocultarCarrito();
}

// Actualizamos el total del carrito
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    // Recorrer cada elemento del carrito para calcular el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', '').replace(',', '.')); // Ajuste para manejar ',' como separador decimal
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value);

        // Validar que cantidad sea un número entero mayor a cero
        if (!isNaN(cantidad) && cantidad > 0) {
            total += (precio * cantidad)/2;
        }
    }

    // Redondear el total a dos decimales
    total = Math.round(total * 100) / 100;

    // Actualizar el elemento HTML que muestra el total
    var totalCarritoElemento = document.getElementsByClassName("carrito-precio-total")[0];
    if (totalCarritoElemento) {
        totalCarritoElemento.innerText = "$" + total.toLocaleString("es");
    }
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        // Maximizar el contenedor de los elementos 
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function agregarAlcarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
    var precio = item.getElementsByClassName("precio-item")[0].innerText;
    var imagenSrc = item.getElementsByClassName("img-item")[0].src;

    // Función para agregar elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    // Función hacer visible el carrito al agregar 
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement("div");
    item.classList.add("carrito-item");
    var itemsCarrito = document.getElementsByClassName("carrito-items")[0];
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName("carrito-item-titulo");
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }
    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" alt="" width="80px">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <span class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </span>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Función para eliminar el nuevo item
    item.getElementsByClassName("btn-eliminar")[0].addEventListener("click", eliminarItemCarrito);

    // Función para sumar el nuevo item
    var botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
    botonSumarCantidad.addEventListener("click", sumarCantidad);

    // Función para restar el nuevo item
    var botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
    botonRestarCantidad.addEventListener("click", restarCantidad);

    actualizarTotalCarrito();
}

function pagarClicked(event) {
    alert("Gracias por tu compra");

    // Eliminar los elementos del carrito luego de pagar
    var carritoItems = document.getElementsByClassName("carrito-items")[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    // Función para ocultar carrito
    ocultarCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";

    var items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "60%";
}
