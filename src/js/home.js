//definicja elementów
const coursesList = document.querySelector(".courses-list");
const counter = document.querySelector(".counter");
const buttonCart = document.querySelectorAll(".cart-button");

function createCart() {
  let items = [];

  const refreshProductsCount = () => {
    counter.innerText = items.length;
  };

  const updateStore = () => {
    //zapisać dane do localStorage
    localStorage.setItem("items", JSON.stringify(items));
  };

  const setItems = (newItems) => {
    items = newItems;
    updateStore();
    refreshProductsCount();
  };

  //funkcja do dodawania
  const add = (id, title, price, quantity = 1) => {
    // parametry
    items.push({ id, title, price, quantity });
    refreshProductsCount();
    updateStore();
  };

  const remove = (id) => {
    const index = items.findIndex((item) => item.id === id);
    console.log(items[index]);
    items.splice(index, 1);
    refreshProductsCount();
    updateStore();
  };

  const hasItem = (id) => {
    return items.find((item) => item.id === id);
  };

  return {
    add,
    remove,
    setItems,
    hasItem,
  };
}

const cart = createCart();
const startItems = JSON.parse(localStorage.getItem("items"));
if (startItems) {
  cart.setItems(startItems);
}

// funkcja która obsłuży kolor buttona
const toggleClass = (className, text, mode) => {
  // mode = 'add', 'remove'
  return (element) => {
    element.classList[mode](className);
    element.innerText = text;
  };
};

const addClassInCart = toggleClass("in-cart", "Usuń z koszyka", "add");
const removeClassInCart = toggleClass("in-cart", "Dodaj do koszyka", "remove");

//obsługa buttona
const addToCartHandler = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const title = e.target.dataset.title;
  const price = Number(e.target.dataset.price);
  const id = Number(e.target.dataset.id);

  if (cart.hasItem(id)) {
    //usunac
    cart.remove(id);
    removeClassInCart(e.target);
  } else {
    cart.add(id, title, price);
    addClassInCart(e.target);
  }
};

//listenery
coursesList.addEventListener("click", addToCartHandler);

//ustawić kolor buttonów domyślnie

buttonCart.forEach((button) => {
  if (cart.hasItem(+button.dataset.id)) {
    addClassInCart(button);
  }
});
