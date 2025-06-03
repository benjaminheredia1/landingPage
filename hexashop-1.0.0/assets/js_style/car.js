// Función que maneja la apertura y cierre del panel del carrito
function funciones_carrito() {
  let panelCarrito = document.getElementById("floating-cart-panel");
  let botonCarrito = document.getElementById("floating-cart");
  let cerrarPanelCarrito = document.getElementById("close-cart-panel");

  // cerrar el panel del carrito
  cerrarPanelCarrito.addEventListener("click", () => {
    panelCarrito.style.display = "none";
    botonCarrito.style.display = "unset";
  });

  // mostrar el panel del carrito
  botonCarrito.addEventListener("click", () => {
    panelCarrito.style.display = "unset";
    botonCarrito.style.display = "none";
  });
}

// Función para actualizar el precio total según la cantidad de productos
function actualizar_total() {
  let etiquetaPrecioTotal = document.getElementById("total-price-all");
  let cantidadProducto = document.getElementById("value-cloes").value;

  // Verifica si hay precio y cantidad para hacer el cálculo
  if (etiquetaPrecioTotal.textContent && cantidadProducto) {
    etiquetaPrecioTotal.textContent = "Total: $";
    etiquetaPrecioTotal.textContent += parseInt(cantidadProducto) * 210;
    etiquetaPrecioTotal.textContent += ".00";
  }
}

// Función que agrega los eventos a los botones + y - para cambiar la cantidad
function manejar_cantidad_producto() {
  let inputCantidad = document.getElementById("value-cloes");

  if (inputCantidad) {
    // Botón de disminuir cantidad
    document
      .getElementById("button-product-min")
      .addEventListener("click", () => {
        actualizar_total();
      });

    // Botón de aumentar cantidad
    document
      .getElementById("button-product-max")
      .addEventListener("click", () => {
        actualizar_total();
      });
  }
}

// Código que se ejecuta cuando el documento ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  let botonAgregarCarrito = document.getElementById("add_to_car");
  let contadorCarrito = document.getElementById("cart-count");

  funciones_carrito();            
  manejar_cantidad_producto();

  if (botonAgregarCarrito) {
    // Evento al hacer clic en "Agregar al carrito"
    botonAgregarCarrito.addEventListener("click", () => {
      contadorCarrito.textContent = 1 + parseInt(contadorCarrito.textContent);

      // Eliminar mensaje de "carrito vacío" si existe
      if (document.getElementById("list-group-item-1")) {
        if (
          document.getElementById("list-group-item-1").textContent ==
          "No hay productos en el carrito."
        ) {
          document.getElementById("cart-items-list").innerHTML = "";
        }
      }

      // Agregamos un nuevo producto al carrito
      document.getElementById(
        "cart-items-list"
      ).innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="d-flex flex-column">
    <strong>Chaqueta Verde Nueva</strong>
    <small class="text-muted">Cantidad: 2</small>
  </div>
  <div class="d-flex align-items-center">
    <span class="me-3">$75.00 c/u</span>
    <span class="fw-bold me-3">$150.00</span>
    <button type="button" class="btn btn-sm btn-danger" aria-label="Eliminar">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</li>`;
    });
  }
});
