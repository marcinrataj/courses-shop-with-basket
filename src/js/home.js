//definicja elementów
const coursesList = document.querySelector(".courses-list");
const counter = document.querySelector(".counter");

function createCart() {
  //lista produktów
  const items = [];
  // funkcja do odświeżania
  const refreshProductsCount = () => {
    counter.innerText = items.length;
  };
  //funkcja do dodawania
  const add = (id, title, price, quantity = 1) => { // parametry
    items.push({ id, title, price, quantity});
    refreshProductsCount();
    console.log(items);
  };

  const remove = (id) => {
    const index = items.findIndex((item) => item.id === id);
    console.log(items[index]);
    // wybieram el. 'index', odstęp tylko 1, wytnij go, i funkcja refresh
    items.splice(index, 1);
    refreshProductsCount()
  };

  return {
    add,
    remove,
  };
}

const cart = createCart();
// console.log(cart)

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

  if (e.target.classList.contains("in-cart")) {
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
