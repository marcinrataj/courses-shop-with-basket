//czas
const d = new Date();
d.setHours(d.getHours() + 1) // obecny czas + 1h do przodu
const utc = d.toUTCString();

// document.cookie = 'theme=light; expires=' + utc;
document.cookie = 'username=Adam; expires=' + utc;

// console.log(getCookie(`username`))

setCookie('tekst', encodeURIComponent(`tytuł
opis`), 1)
deleteCookie('theme')

// document.cookie.split(';')
//Teraz uczymy się tworzyć funkcje do obsługi cookiesów, dodawnie, odejmowanie itd...

// funkcja ustawCookiesa
function setCookie(name, value, expirationHours) {
  const date = new Date();
  date.setHours(date.getHours() + expirationHours)
  document.cookie = `${name}=${value};
  expires=${date.toUTCString()}`;
}

console.log(getCookie('tekst'))

//funkcja usun Cookiesa
function deleteCookie(name){
  document.cookie= `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`
}

//funkcja weźCookiesa, wyświetl {podziel go, znajdź z takim początkiem, dodaj '=' }
function getCookie(name){
  const cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith(`${name}=`))
  ?.split('=')[1];

  return cookieValue ?
  decodeURIComponent(cookieValue) : ''
}