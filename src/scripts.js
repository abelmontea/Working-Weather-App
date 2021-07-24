//upon loading weather
function seattleWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=seattle&units=metric&appid=2e10dd656c312415a04f00d607cce045`;
  axios.get(apiUrl).then(showSeattleWeather);
}
function showSeattleWeather(response) {
  let cityDescription = document.querySelector("#weather-description");
  let currentTemp = document.querySelector("#current-temperature");
  let lowTemp = document.querySelector("#low-temp");
  let highTemp = document.querySelector("#high-temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-speed");
  let description = response.data.weather[0].main;
  let showHumidity = response.data.main.humidity;
  let showWind = response.data.wind.speed;
  let cityTemp = Math.round(response.data.main.temp);
  let showLowTemp = Math.round(response.data.main.temp_min);
  let showHighTemp = Math.round(response.data.main.temp_max);
  cityDescription.innerHTML = `<h2>${description}</h2>`;
  currentTemp.innerHTML = `${cityTemp}`;
  lowTemp.innerHTML = `${showLowTemp}°`;
  highTemp.innerHTML = `${showHighTemp}°`;
  humidity.innerHTML = `${showHumidity}`;
  wind.innerHTML = `${showWind}`;
  celciusTemperature = response.data.main.temp;
}

seattleWeather();

//date and time funcitonality
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = document.querySelector("#day");
let now = new Date();

day.innerHTML = `${days[now.getDay()]}`;

function formatTime() {
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `${hours}`;
    minutes = `${minutes} AM`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 10) {
    hours = `${hours - 12}`;
    minutes = `${minutes} PM`;
  }
  return `${hours}:${minutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = formatTime();

//current location button functionality
function showCurrentCity() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
  function showLocation(position) {
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let apiKey = "2e10dd656c312415a04f00d607cce045";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(changeCityandTemperature);
  }
  function changeCityandTemperature(response) {
    let cityDescription = document.querySelector("#weather-description");
    let currentTemp = document.querySelector("#current-temperature");
    let humidity = document.querySelector("#humidity");
    let lowTemp = document.querySelector("#low-temp");
    let highTemp = document.querySelector("#high-temp");
    let newCity = document.querySelector("#city-state");
    let wind = document.querySelector("#wind-speed");
    let description = response.data.weather[0].main;
    let showHumidity = response.data.main.humidity;
    let showWind = response.data.wind.speed;
    let cityTemp = Math.round(response.data.main.temp);
    let showLowTemp = Math.round(response.data.main.temp_min);
    let showHighTemp = Math.round(response.data.main.temp_max);
    cityDescription.innerHTML = `<h2>${description}</h2>`;
    currentTemp.innerHTML = `${cityTemp}`;
    highTemp.innerHTML = `${showHighTemp}°`;
    humidity.innerHTML = `${showHumidity}`;
    lowTemp.innerHTML = `${showLowTemp}°`;
    newCity.innerHTML = `${response.data.name} Weather`;
    wind.innerHTML = `${showWind}`;
    celciusTemperature = response.data.main.temp;
  }
}

let currentLocationButton = document.querySelector(".use-current-location");
currentLocationButton.addEventListener("click", showCurrentCity);

//Search location and temperature functionality
function newCityTemperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let showHumidity = response.data.main.humidity;
  let currentTemp = document.querySelector("#current-temperature");
  let description = response.data.weather[0].main;
  let cityDescription = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind-speed");
  let showWind = response.data.wind.speed;
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let showHighTemp = Math.round(response.data.main.temp_max);
  let showLowTemp = Math.round(response.data.main.temp_min);
  highTemp.innerHTML = `${showHighTemp}°`;
  lowTemp.innerHTML = `${showLowTemp}°`;
  currentTemp.innerHTML = `${cityTemp}`;
  humidity.innerHTML = `${showHumidity}`;
  wind.innerHTML = `${showWind}`;
  cityDescription.innerHTML = `<h2>${description}</h2>`;
  celciusTemperature = response.data.main.temp;
}

function showNewCity() {
  event.preventDefault();
  let city = document.querySelector(".search-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=2e10dd656c312415a04f00d607cce045`;
  let newCity = document.querySelector("#city-state");
  newCity.innerHTML = `${city.value} Weather`;
  axios.get(apiUrl).then(newCityTemperature);
}

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", showNewCity);

//unit conversion
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
  celciusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
}

let fahrenheitConversion = document.querySelector("#fahrenheit-link");
fahrenheitConversion.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
  fahrenheitConversion.classList.remove("active");
  celciusConversion.classList.add("active");
}
let celciusConversion = document.querySelector("#celsius-link");
celciusConversion.addEventListener("click", convertToCelcius);

let celciusTemperature = null;

//changing image with temperature
