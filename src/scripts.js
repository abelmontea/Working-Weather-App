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
  let weatherIcon = document.querySelector("#weather-icon");
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
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = response.data.main.temp;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=47.6062&lon=-122.3321&appid=2e10dd656c312415a04f00d607cce045&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 12) {
    hours = `${hours}`;
    minutes = `${minutes} AM`;
  }
  if (hours >= 13) {
    hours = `${hours - 12}`;
    minutes = `${minutes} PM`;
  }
  return `${hours}:${minutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = formatTime();

//current location button functionality
function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
  function showLocation(position) {
    let lat = Math.round(position.coords.latitude);
    let long = Math.round(position.coords.longitude);
    let apiKey = "2e10dd656c312415a04f00d607cce045";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(changeCityandTemperature);

    let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(forecastApi).then(displayForecast);
  }
  function changeCityandTemperature(response) {
    let cityDescription = document.querySelector("#weather-description");
    let currentTemp = document.querySelector("#current-temperature");
    let forecastCity = document.querySelector("#forecast-city");
    let humidity = document.querySelector("#humidity");
    let lowTemp = document.querySelector("#low-temp");
    let highTemp = document.querySelector("#high-temp");
    let newCity = document.querySelector("#city-state");
    let weatherIcon = document.querySelector("#weather-icon");
    let wind = document.querySelector("#wind-speed");
    let description = response.data.weather[0].main;
    let showHumidity = response.data.main.humidity;
    let showWind = response.data.wind.speed;
    let cityTemp = Math.round(response.data.main.temp);
    let showLowTemp = Math.round(response.data.main.temp_min);
    let showHighTemp = Math.round(response.data.main.temp_max);

    cityDescription.innerHTML = `<h2>${description}</h2>`;
    currentTemp.innerHTML = `${cityTemp}`;
    forecastCity.innerHTML = `${response.data.name}`;
    highTemp.innerHTML = `${showHighTemp}°`;
    humidity.innerHTML = `${showHumidity}`;
    lowTemp.innerHTML = `${showLowTemp}°`;
    newCity.innerHTML = `${response.data.name} Weather`;
    wind.innerHTML = `${showWind}`;
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
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
  let weatherIcon = document.querySelector("#weather-icon");

  highTemp.innerHTML = `${showHighTemp}°`;
  lowTemp.innerHTML = `${showLowTemp}°`;
  currentTemp.innerHTML = `${cityTemp}`;
  humidity.innerHTML = `${showHumidity}`;
  wind.innerHTML = `${showWind}`;
  cityDescription.innerHTML = `<h2>${description}</h2>`;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showNewCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=2e10dd656c312415a04f00d607cce045`;
  let newCity = document.querySelector("#city-state");
  let forecastCity = document.querySelector("#forecast-city");
  forecastCity.innerHTML = `${city.value}`;
  newCity.innerHTML = `${city.value} Weather`;
  axios.get(apiUrl).then(newCityTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showNewCity);

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

//forecast functionality
function displayForecast(response) {
  let forecast = document.querySelector("#forecast-data");
  let forecastHTML = `<div class="row justify-content-start text-center">`;
  let forecastData = response.data.daily;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 4)
      forecastHTML =
        forecastHTML +
        `
    <div class="col first-forecast border-right">
    <span id="first-day">${formatTimestamp(forecastDay.dt)}</span>
    <div id="temp" class="forecast-temp">
      ${Math.round(forecastDay.temp.day)}°</div>
    <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      class="first-day-image"
    />
    </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2e10dd656c312415a04f00d607cce045";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatTimestamp(date) {
  let timestamp = new Date(date * 1000);
  let day = timestamp.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
