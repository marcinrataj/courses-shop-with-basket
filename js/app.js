//definicja elementów
const coursesList = document.querySelector(".courses-list");

//lista produktów
const items = [];

const addToCart = (title, price, quantity = 1) => {
  console.log(title, price, quantity);
  items.push({
    title: title,
    price: price,
    quantity: quantity,
  });
  console.log(items);
};

//obsługa buttona
const addToCartHandler = (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const title = e.target.dataset.title;
  const price = Number(e.target.dataset.price);
  addToCart(title, price);
};

//listenery
coursesList.addEventListener("click", addToCartHandler);
