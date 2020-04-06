const api = {
  key: '6f356301acf3d27a6188b93b306a668c',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=pl`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerText = `${Math.round(weather.main.temp)}°C`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.current .hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}

function dateBuilder(d) {
  let months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ];
  let days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Sroda',
    'Czwartek',
    'Piątek',
    'Sobota'
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
