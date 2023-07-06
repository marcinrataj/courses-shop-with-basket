const product1 = { price: 10, title: "JS od podstaw" }
const product2 = { price: "20", title: "PHP od podstaw" }
const discount = 10
let discountEnabled = false

const discountElement = document.querySelector("#discount")
const discountCheckbox = document.querySelector("#add-discount")
const discountContainer = document.querySelector("#discount-amount")
const itemsContainer = document.querySelector("#items")

//dodaj produkty do tabeli
function addItem(item) {
  itemsContainer.innerHTML += `
  <tr>
  <td><button class="delete">x</button></td>
  <td>${item.title}</td>
  <td><input class="quantity" type="number" value="1"></td>
  <td>${item.price}</td>
  </tr>`

  // pokazujemy dodawanie elementów innym sposobem, dużo brzydszy zapis, zajmuje dużo miejsca
  const tr = document.createElement("tr")
  const td1 = document.createElement("td")
  const button = document.createElement("button")
  button.innerText = "x"
  button.classList = 'delete'
  button.setAttribute("class", "delete")
  td1.appendChild(button)

  const td2 = document.createElement('td')
  td2.innerText = item.title

  const td3 = document.createElement('td');
  const input = document.createElement('input')
  input.setAttribute('type', 'number');
  input.setAttribute('value', '1');
  input.setAttribute('class', 'quantity');
  td3.appendChild(input)

  const td4 = document.createElement('td');
  td4.innerText = item.price;

  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
}

addItem(product1)
addItem(product2)

//usuwanie wierszy
const quantityInputs = document.querySelectorAll(".quantity")
for (let i = 0; i < quantityInputs.length; i++) {
  quantityInputs[i].addEventListener("change", removeRowFromQuantity)
}
function removeRow(e) {
  if (e.target.tagName === "BUTTON") {
    const row = e.target.closest("tr")
    row.remove()
  }
}
function removeRowFromQuantity(e) {
  if (Number(e.target.value === "0")) {
    const row = e.target.closest("tr")
    row.remove()
  }
}

// dodaj zniżkę, jeśli element ma mniej niż 0 to schowaj zniżkę
function addDiscount() {
  discountEnabled = !discountEnabled
  if (discount > 0) {
    document.querySelector("#discount-amount").innerHTML = -discount
    discountElement.classList.toggle("hidden")
  }
  calculatePrice()
}

//cena całkowita, dodanie cen obu produktów i pojawienie wyniku
function calculatePrice() {
  let total = Number(product1.price) + Number(product2.price)
  //jesli jest true zastosuj zniżkę, inaczej cofnij ją
  if (discountEnabled) {
    total -= discount
  }
  document.querySelector("#total-price").innerHTML = total
}
calculatePrice()

//listenery, po kliknięciu wywołaj funkcję
discountCheckbox.addEventListener("click", addDiscount)
itemsContainer.addEventListener("click", removeRow)

//zaznacz checkbox na początku jeśli trzeba, właściwość dataset 1-true 0-false, możemy zmieniac jak chcemy
const discountShouldBeEnabled = Number(
  discountElement.dataset.discountShouldBeEnabled
)

if (discountShouldBeEnabled) {
  discountCheckbox.click()
}
