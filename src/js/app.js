const onBuyClick = (e) => {
  e.preventDefault()
 //sposoby na dostanie sie do pola w formularzu

  // const name = document.querySelector("[name='name']").value
  // const form = document.querySelector('form').elements['name'].value
// odniesienie i z tego obiekt z miejscami z odniesienia
  const elements = document.querySelector('form').elements;
  const values = {
    name: elements['name'].value,
    email: elements['email'].value,
    'email-confirm': elements['email-confirm'].value,
    tel: elements['tel'].value,
    payment: elements['payment'].value,
  };
  console.log(values)
}

const buyButton = document.querySelector('#buy')
buyButton.addEventListener('click', onBuyClick)


//wyświetlenie daty zamówienia
const dateContainer = document.querySelector("#date");

const showOrderDate = (element) => {
  const d = new Date();
  element.innerHTML = d.toLocaleString();
};

showOrderDate(dateContainer);

// wyświetl podsumowanie (produkty)
const itemsContainer = document.querySelector('#items-list');
const items = JSON.parse(localStorage.getItem('items')) || [];

const showProducts = (products, element) => {
  console.log(products)
  const html = products
  .map(p => `<li>${p.quantity} x "${p.title}"</li>`)
  .join('');
  element.innerHTML = html;
}

showProducts(items, itemsContainer)

//wyświetl cenę całkowitą
const priceContainer = document.querySelector('#total-price')
priceContainer.innerText = localStorage.getItem('totalPrice') || 0;