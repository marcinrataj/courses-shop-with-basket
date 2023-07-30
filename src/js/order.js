const validateName = (value) => {
  if (!value) return `Imie i nazwisko jest wymagane`;
  if (value.length < 3) return `Imię i nazwisko jest za krótkie`;
};

const validateTel = (value) => {
  if (!value) return `Telefon jest wymagany`;
  if (value.length < 9) return `Telefon jest niepoprawny`;
};

const validateEmail = (value) => {
  if (!value) return `Email jest wymagany`;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) return "Email nie jest poprawny";
};

const validateEmailConfirm = (value, email) => {
  if (value !== email) return `Email jest inny`;
};

const validate = (key, value, allValues) => {
  switch (key) {
    case "name":
      return validateName(value);
    case "tel":
      return validateTel(value);
    case "email":
      return validateEmail(value);
    case "email-confirm":
      return validateEmailConfirm(value, allValues.email);
  }
};

const validateValues = (values) => {
  const errors = [];
  Object.entries(values).forEach(([key, value]) => {
    const error = validate(key, value, values);
    if (error) errors.push(error);
  });

  document.querySelector("#errors").innerHTML = errors
    .map((e) => `<li>${e}</li>`)
    .join("");

  return errors.length > 0;
};

const onSubmit = (e) => {
  //sposoby na dostanie sie do pola w formularzu
  e.preventDefault();

  const elements = document.querySelector("form").elements;
  const values = {
    name: elements["name"].value,
    email: elements["email"].value,
    "email-confirm": elements["email-confirm"].value,
    tel: elements["tel"].value,
    payment: elements["payment"].value,
  };

  const hasErrors = validateValues(values);

  if (!hasErrors) {
    document.querySelector("#loading").style.display = "flex";

    setTimeout(() => {
      window.location.href = '/podziekowanie.html'
    }, 3000)
  }
};

//podpięcie formularza
document.querySelector("form").addEventListener("submit", onSubmit);

//wyświetlenie daty zamówienia
const dateContainer = document.querySelector("#date");

const showOrderDate = (element) => {
  const d = new Date();
  element.innerHTML = d.toLocaleString();
};

showOrderDate(dateContainer);

// wyświetl podsumowanie (produkty)
const itemsContainer = document.querySelector("#items-list");
const items = JSON.parse(localStorage.getItem("items")) || [];

const showProducts = (products, element) => {
  console.log(products);
  const html = products
    .map((p) => `<li>${p.quantity} x "${p.title}"</li>`)
    .join("");
  element.innerHTML = html;
};

showProducts(items, itemsContainer);

//wyświetl cenę całkowitą
const priceContainer = document.querySelector("#total-price");
priceContainer.innerText = localStorage.getItem("totalPrice") || 0;
