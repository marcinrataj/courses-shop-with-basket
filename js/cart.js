//IIFE
(function () {
  const cart = {
    price: 0,
    getPrice() {
      this.price = 0;
      this.items.forEach((item) => (this.price += item.price));
      this.price -= this.getDiscountIfEnabled();
      return this.price;
    },
    getDiscount() {
      return this.discount.amount;
    },
    getDiscountIfEnabled() {
      if (this.discount.enabled) {
        return this.getDiscount();
      } else {
        return 0;
      }
    },
    discount: {
      amount: 10,
      enabled: false,
    },
    items: [
      { price: 10, title: "JS od podstaw" },
      { price: 20, title: "PHP od podstaw" },
    ],
  };

  //definicja elementów
  const discountElement = document.querySelector("#discount");
  const discountCheckbox = document.querySelector("#add-discount");
  const itemsContainer = document.querySelector("#items");

  for (const item of cart.items) {
    addItem(item);
  }

  //dodaj produkty do tabeli
  function addItem(item) {
    itemsContainer.innerHTML += `
  <tr>
  <td><button class="delete">x</button></td>
  <td>${item.title}</td>
  <td><input class="quantity" type="number" value="1"></td>
  <td>${item.price}</td>
  </tr>`;
  }
  // addItem(product1);
  // addItem(product2);

  //usuwanie wierszy
  const quantityInputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", removeRowFromQuantity);
  }
  function removeRow(e) {
    if (e.target.tagName === "BUTTON") {
      const row = e.target.closest("tr");
      row.remove();
    }
  }
  function removeRowFromQuantity(e) {
    if (Number(e.target.value === "0")) {
      const row = e.target.closest("tr");
      row.remove();
    }
  }

  // dodaj zniżkę
  const addDiscount = function (e) {
    this.discount.enabled = e.target.checked;
    if (this.getDiscount() > 0) {
      document.querySelector("#discount-amount").innerHTML =
        -this.getDiscount();
      discountElement.classList.toggle("hidden");
    }
    calculatePrice();
  };

  //cena całkowita
  function calculatePrice() {
    let total = cart.getPrice();
    document.querySelector("#total-price").innerHTML = total;
  }
  calculatePrice();

  //listenery, po kliknięciu wywołaj funkcję
  discountCheckbox.addEventListener("click", addDiscount.bind(cart));
  itemsContainer.addEventListener("click", removeRow);

  //zaznacz checkbox na początku jeśli trzeba, właściwość dataset 1-true 0-false, możemy zmieniac jak chcemy
  const discountShouldBeEnabled = Number(
    discountElement.dataset.discountShouldBeEnabled
  );

  if (discountShouldBeEnabled) {
    discountCheckbox.click();
  }
})();
