//upon loading weather
function SeattleWeather() {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=seattle&units=metric&appid=2e10dd656c312415a04f00d607cce045`;
  axios.get(apiUrl).then(showSeattleWeather);
  console.log(axios.get(apiUrl));
}
function showSeattleWeather(response) {
  let currentTemp = document.querySelector("#current-temperature");
  let cityTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let cityDescription = document.querySelector("#weather-description");
  currentTemp.innerHTML = `${cityTemp}`;
  cityDescription.innerHTML = `<h2>${description}</h2>`;
}

SeattleWeather();

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
    let newCity = document.querySelector("#city-state");
    let currentTemp = document.querySelector("#current-temperature");
    let cityTemp = Math.round(response.data.main.temp);
    let description = response.data.weather[0].main;
    let cityDescription = document.querySelector("#weather-description");
    newCity.innerHTML = `${response.data.name} Weather`;
    currentTemp.innerHTML = `${cityTemp}`;
    cityDescription.innerHTML = `<h2>${description}</h2>`;
  }
}

let currentLocationButton = document.querySelector(".use-current-location");
currentLocationButton.addEventListener("click", showCurrentCity);
