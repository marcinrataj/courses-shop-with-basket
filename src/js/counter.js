(() => {
  const now = new Date();
const endTime = now.getTime()
const counter = document.querySelector('#promotion-counter');

const getSecondUntilDate = (date) =>{
  const end = new Date(date)
  const seconds = end.getTime() / 1000;
  const startSeconds = Date.now() / 1000;

  return seconds - startSeconds;

}

const getTimerFormat = seconds => {
  if(seconds <= 0) return 'Koniec'
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = Math.floor(seconds - h * 3600 - m * 60);

  return `${h} godz. ${m} min. ${s} s`
}

const s = getSecondUntilDate(endTime) + 12

counter.innerHTML = getTimerFormat(s);
// obliczyc ilość sekund od 0 do czassu docelowego
// przygotować odpowiedni wzór licznika (h:m:s)



})()



