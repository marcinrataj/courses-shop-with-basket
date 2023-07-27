//czas
const d = new Date();
d.setHours(d.getHours() + 1) // obecny czas + 1h do przodu
const utc = d.toUTCString();

document.cookie = 'theme=light; expires=' + utc;
document.cookie = 'name=Adam; expires=';

// document.cookie.split(';')
//Teraz uczymy się tworzyć funkcje do obsługi cookiesów, dodawnie, odejmowanie itd...  