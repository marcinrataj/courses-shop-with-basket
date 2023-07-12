
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
  const add = (title, price, quantity = 1) => {
    items.push({ title: title, price: price, quantity: quantity });
    refreshProductsCount();
    console.log(items);
  };

  return {
    add
  }
}

const cart = createCart()
console.log(cart)


// funkcja która obsłuży kolor buttona

const addClass = (className, text) => {
    return (element) => {
    element.classList.add(className);
    element.innerText = text;
  }
}

const addClassInCart = addClass('in-cart', 'Dodano');

//obsługa buttona
const addToCartHandler = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const title = e.target.dataset.title;
  const price = Number(e.target.dataset.price);
  cart.add(title, price);
  addClassInCart(e.target)
};

//listenery
coursesList.addEventListener("click", addToCartHandler);
