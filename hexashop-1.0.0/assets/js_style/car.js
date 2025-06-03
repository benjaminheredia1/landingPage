function car_functions() {
  let menu_cart = document.getElementById("floating-cart-panel");
  let cart = document.getElementById("floating-cart");
  let close_menu_cart = document.getElementById("close-cart-panel");
  close_menu_cart.addEventListener("click", () => {
    menu_cart.style.display = "none";
    cart.style.display = "unset";
  });
  cart.addEventListener("click", () => {
    menu_cart.style.display = "unset";
    cart.style.display = "none";
  });
}

function update_prices() {
  let price = document.getElementById("total-price-all");
  let cloes = document.getElementById("value-cloes").value;
  if (price.textContent && cloes) {
    price.textContent = "Total: $";
    price.textContent += parseInt(cloes) * 210;
    price.textContent += ".00";
  }
}

function price_cloes() {
  let input_cloes = document.getElementById("value-cloes");
  if (input_cloes) {
    //alert(input_cloes.value);
    document
      .getElementById("button-product-min")
      .addEventListener("click", () => {
        update_prices();
      });
    document
      .getElementById("button-product-max")
      .addEventListener("click", () => {
        update_prices();
      });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  let button = document.getElementById("add_to_car");
  let cart = document.getElementById("cart-count");
  car_functions();
  price_cloes();
  if (button) {
    button.addEventListener("click", () => {
      cart.textContent = 1 + parseInt(cart.textContent);
      if (document.getElementById("list-group-item-1")) {
        if (
          document.getElementById("list-group-item-1").textContent ==
          "No hay productos en el carrito."
        ) {
          document.getElementById("cart-items-list").innerHTML = "";
        }
      }

      document.getElementById(
        "cart-items-list"
      ).innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="d-flex flex-column">
    <strong>New Green Jacket</strong>
    <small class="text-muted">Cantidad: 2</small>
  </div>
  <div class="d-flex align-items-center">
    <span class="me-3">$75.00 c/u</span>
    <span class="fw-bold me-3">$150.00</span>
    <button type="button" class="btn btn-sm btn-danger" aria-label="Eliminar">
      <i class="fa fa-trash"></i>
    </button>
  </div>
</li>
`;
    });
  }
});
