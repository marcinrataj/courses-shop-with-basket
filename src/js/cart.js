//IIFE
(function () {
  const cart = {
    price: 0,
    getPrice(callback) {
      this.price = callback(this.items, this.getDiscountIfEnabled());
      if(this.price < 0) this.price = 0
      
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
    removeCourse(id) {
      console.log(id);
      const index = this.items.findIndex((item) => item.id === id);
      this.items.splice(index, 1)
      // usunięcie kursu z tablicy this.items
    },
    discount: {
      amount: 10,
      enabled: false,
    },
    items: [
      { id: 1, price: 10, title: "JS od podstaw",},
      { id: 2, price: 20, title: "PHP od podstaw",},
    ],
  };

  //definicja elementów
  const discountElement = document.querySelector("#discount");
  const discountCheckbox = document.querySelector("#add-discount");
  const itemsContainer = document.querySelector("#items");
//jeśli produkt z tablicy będzie miał mniejszą cene to idzie na górę
  cart.items.sort((a, b) => a.price - b.price);
  for (const item of cart.items) {
    addItem(item);
  }

  //dodaj produkty do tabeli
  function addItem(item) {
    itemsContainer.innerHTML += `
  <tr data-course-id="${item.id}">
  <td><button class="delete">x</button></td>
  <td>${item.title}</td>
  <td><input class="quantity" type="number" value="1"></td>
  <td>${item.price}</td>
  </tr>`;
  }
  //usuwanie wierszy
  function removeRow(e) {
    if (e.target.tagName === "BUTTON") {
      const row = e.target.closest("tr");
      cart.removeCourse(Number(row.dataset.courseId));
      row.remove();
      //odświeżaj przy każdym dodaniu, usunieciu 
      calculatePrice()
    }
  }
  function removeRowFromQuantity(e) {
    if (Number(e.target.value === "0")) {
      const row = e.target.closest("tr");
      //dataset przechodzi po ID i mam / wiemy które id usuwamy
      cart.removeCourse(Number(row.dataset.courseId));
      row.remove();
       //odświeżaj przy każdym dodaniu, usunieciu 
       calculatePrice()
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

  // 2 sposoby licznia ceny, 2 callbacki
  // NORMALNY KLIENT NORMALNA ZNIŻKA
  const getPriceRegularClient = (items, discount) => {
    // let price = 0;
    // items.forEach( item => price += item.price);
    // price -= discount;
    const price = items.reduce((acc, item) => (acc += item.price), -discount);
    return price;
  };
  //VIP KLIENT, LEPSZA ZNIŻKA
  const getPriceSuperClient = (items, discount) => {
    let price = items.reduce((acc, item) => acc + item.price, 0);
    price -= discount;
    return price;
  };

  //cena całkowita
  const calculatePrice = () => {
    const superClient = true;
    let cb = getPriceRegularClient;
    if (superClient) cb = getPriceSuperClient;

    let total = cart.getPrice(cb);
    document.querySelector("#total-price").innerHTML = total;
  };
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
