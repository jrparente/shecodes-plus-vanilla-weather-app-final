// Change h2 to today's date
let today = new Date();

let date = today.getDate();
let year = today.getFullYear();
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];

let updateDate = document.querySelector("#updated-date");
updateDate.innerHTML = `${day}, ${month} ${date} ${year}, ${hour}:${minutes}`;

// Get forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&exclude=hourly,minutely`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
            <div class="WeatherForecastPreview">
              <div class="forecast-time">${formatDay(
                day.dt
              )}</div><img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@2x.png" alt="icon"
                class="icon-" id="icon" />
              <div class="forecast-temperature"><span class="forecast-temperature-max">${Math.round(
                day.temp.max
              )}</span>º <span
                  class="forecast-temperature-min">${Math.round(
                    day.temp.min
                  )}</span>º</div>
            </div>
          </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

// Get temperature in city
function getWeather(response) {
  let cityHTML = document.querySelector("#titleCity");
  cityHTML.innerHTML = response.data.name;
  let cityTemp = document.querySelector("#todays-temp");
  let temp = Math.round(response.data.main.temp);
  cityTemp.innerHTML = temp;
  let wind = document.querySelector(".wind-speed");
  let windspeed = Math.round(response.data.wind.speed);
  wind.innerHTML = windspeed;
  let hum = document.querySelector(".humidity");
  let humidity = Math.round(response.data.main.humidity);
  hum.innerHTML = humidity;
  let iconElement = document.querySelector(".icon-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector(".highlight-text");
  let advice = document.querySelector(".advice");
  let weatherdescription = response.data.weather[0].main;
  if (weatherdescription === "Clear") {
    description.innerHTML = "sunny";
    advice.innerHTML = "Don't forget your sunglasses!";
  }
  if (weatherdescription === "Clouds") {
    description.innerHTML = "cloudy";
    advice.innerHTML = "You should still apply SPF!";
  }
  if (weatherdescription === "Rain") {
    description.innerHTML = "rainy";
    advice.innerHTML = "Don't forget your umbrella!";
  }
  if (weatherdescription === "Drizzle") {
    description.innerHTML = "drizzly";
    advice.innerHTML = "Don't forget your umbrella!";
  }
  if (weatherdescription === "Thunderstorm") {
    description.innerHTML = "stormy";
    advice.innerHTML = "Don't stand under a tree!";
  }
  if (weatherdescription === "Snow") {
    description.innerHTML = "snowy";
    advice.innerHTML = "Don't forget your hat and mittens!";
  }
  if (weatherdescription === "Mist") {
    description.innerHTML = "misty";
    advice.innerHTML = "Don't forget your coat!";
  }
  if (weatherdescription === "Smoke") {
    description.innerHTML = "smoky";
    advice.innerHTML = "The air isn't healthy today. Stay in!";
  }
  if (weatherdescription === "Fog") {
    description.innerHTML = "foggy";
    advice.innerHTML = "It's not a good day to play outside";
  }
  getForecast(response.data.coord);
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let apiKey = "f81d9102f55557fbaab58670b27ef077";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

// convert to from ºC to ºF and vice-versa

function switchTemp(event) {
  event.preventDefault();

  let tempHTML = document.querySelector("#todays-temp");
  let metric = document.querySelector(".celsiusfar-a");
  let otherMetric = document.querySelector(".celsiusfar");

  if (metric.innerHTML === "°C") {
    let celsius = document.querySelector("#todays-temp").innerHTML;
    let farenheit = Math.round(1.8 * celsius + 32);
    tempHTML.innerHTML = farenheit;
    metric.innerHTML = "°F";
    otherMetric.innerHTML = "°C";
  } else {
    let farenheit = document.querySelector("#todays-temp").innerHTML;
    let newcalc = Math.round((farenheit - 32) / 1.8);
    tempHTML.innerHTML = newcalc;
    metric.innerHTML = "°C";
    otherMetric.innerHTML = "°F";
  }
}

let changeMetric = document.querySelector(".celsiusfar");
changeMetric.addEventListener("click", switchTemp);
