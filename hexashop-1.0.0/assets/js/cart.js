document.addEventListener("DOMContentLoaded", () => {
  const cartIconBtn = document.getElementById("cart-icon-button"); // Referencia al botón del ícono del carrito
  const cartCountElement = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartTotalElement = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart-btn");
  const checkoutBtn = document.getElementById("checkout-btn"); // Botón de proceder al pago

  let cart = JSON.parse(localStorage.getItem("shoppingCartMilEstilos")) || []; // Nombre único para localStorage

  // Delegación de eventos para los botones "Añadir al carrito"
  document.body.addEventListener("click", function (event) {
    const addToCartButton = event.target.closest(".add-to-cart-btn");
    if (addToCartButton) {
      event.preventDefault();
      const productElement = addToCartButton.closest(".item");
      if (productElement) {
        const productId = productElement.dataset.id;
        const productName = productElement.dataset.name;
        // Limpiar el precio de " Bs." y convertir a número
        const productPriceText = productElement.dataset.price
          .replace("Bs.", "")
          .trim();
        const productPrice = parseFloat(productPriceText);
        const productImage = productElement.dataset.image;

        if (productId && productName && !isNaN(productPrice) && productImage) {
          addToCart(productId, productName, productPrice, productImage);
        } else {
          console.error(
            "Datos del producto incompletos o incorrectos:",
            productElement.dataset
          );
          alert("No se pudo añadir el producto, datos incompletos.");
        }
      }
    }
  });

  function addToCart(id, name, price, image) {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id, name, price, image, quantity: 1 });
    }
    saveCart();
    renderCart();
    // Opcional: mostrar una pequeña notificación visual en lugar de alert
    // Ejemplo: $('#cartModal').modal('show'); // Abrir modal para ver el producto añadido
    alert(name + " ha sido añadido al carrito!");
  }

  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Limpiar contenedor

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="text-center my-4">Tu carrito está vacío.</p>';
      if (cartCountElement) cartCountElement.textContent = 0;
      if (cartTotalElement) cartTotalElement.textContent = "0.00";
      return;
    }

    const table = document.createElement("table");
    table.classList.add("table", "table-hover", "table-responsive-sm"); // responsive para tablas pequeñas
    table.innerHTML = `
            <thead class="thead-light">
                <tr>
                    <th scope="col" style="width: 15%;">Imagen</th>
                    <th scope="col" style="width: 30%;">Producto</th>
                    <th scope="col" style="width: 15%;">Precio</th>
                    <th scope="col" style="width: 20%;">Cantidad</th>
                    <th scope="col" style="width: 15%;">Subtotal</th>
                    <th scope="col" style="width: 5%;">Acción</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
    const tbody = table.querySelector("tbody");

    let total = 0;
    let totalItems = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      totalItems += item.quantity;

      const tr = document.createElement("tr");
      tr.classList.add("cart-item-row"); // Clase para identificar filas de items
      tr.innerHTML = `
                <td><img src="${item.image}" alt="${
        item.name
      }" class="img-fluid" style="max-width: 60px; height: auto;"></td>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)} Bs.</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-secondary quantity-change" data-id="${
                      item.id
                    }" data-change="-1" aria-label="Disminuir cantidad">-</button>
                    <span class="mx-2 item-quantity">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary quantity-change" data-id="${
                      item.id
                    }" data-change="1" aria-label="Aumentar cantidad">+</button>
                </td>
                <td>${itemTotal.toFixed(2)} Bs.</td>
                <td><button class="btn btn-sm btn-danger remove-item" data-id="${
                  item.id
                }" aria-label="Eliminar producto">&times;</button></td>
            `;
      tbody.appendChild(tr);
    });

    cartItemsContainer.appendChild(table);
    if (cartCountElement) cartCountElement.textContent = totalItems;
    if (cartTotalElement) cartTotalElement.textContent = total.toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("shoppingCartMilEstilos", JSON.stringify(cart));
  }

  function handleQuantityChange(productId, changeAmount) {
    const itemIndex = cart.findIndex((i) => i.id === productId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += parseInt(changeAmount);
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1); // Eliminar si la cantidad es 0 o menos
      }
    }
    saveCart();
    renderCart();
  }

  function removeItemFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    renderCart();
  }

  // Event listeners para botones dentro del modal (usando delegación en el contenedor del modal)
  const modalBody = document.querySelector("#cartModal .modal-body");
  if (modalBody) {
    // Asegurarse que el modal existe antes de añadir listeners
    modalBody.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".remove-item");
      const quantityButton = event.target.closest(".quantity-change");

      if (removeButton) {
        const productId = removeButton.dataset.id;
        removeItemFromCart(productId);
      } else if (quantityButton) {
        const productId = quantityButton.dataset.id;
        const change = quantityButton.dataset.change;
        handleQuantityChange(productId, change);
      }
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (
        cart.length > 0 &&
        confirm("¿Estás seguro de que quieres vaciar el carrito?")
      ) {
        cart = [];
        saveCart();
        renderCart();
      } else if (cart.length === 0) {
        alert("El carrito ya está vacío.");
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        alert(
          "Proceso de pago aún no implementado. Redirigiendo a contacto como ejemplo..."
        );
        // Aquí podrías redirigir a una página de checkout real o integrar un sistema de pago.
        // Por ahora, como ejemplo, podemos simular una acción o redirigir:
        window.location.href = "contacto.html"; // Ejemplo de redirección
      } else {
        alert(
          "Tu carrito está vacío. Añade productos antes de proceder al pago."
        );
      }
    });
  }

  // Renderizar el carrito al cargar la página para mostrar items guardados
  renderCart();
});
