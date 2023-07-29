//session storage a local storage - różni je tylko czas przechowywania danych
//czas trwania cookiesa to tylko aktualna sesja
//session storage - magazyn który trzyma dane wyłącznie w obecnej sesji
//local storage - magazyn który trzyma dane bez limitu czasu, zawsze
//Session Storage i Local Storage mają 5MB - 10MB pamięci !!! to bardzo dużo

//SESSION STORAGE
// USTAWIAMY i w przypadku obiektu zmieniamy na 'stringa' | klucz , wartość |
sessionStorage.setItem('text', JSON.stringify({name: 'Adam'}))
console.log(JSON.parse(sessionStorage.getItem('text'))) // {name: 'Adam'}
sessionStorage.clear('text')

//LOCAL STORAGE
localStorage.setItem('username', 'Adam');
console.log(localStorage.getItem('username')); // Adam
localStorage.removeItem('username')
localStorage.clear('username')
