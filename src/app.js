// Change h2 to today's date
let today = new Date();

let date = today.getDate();
let year = today.getFullYear();
let minutes = today.getMinutes();
let hour = today.getHours();

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

// Get temperature in city
function getWeather(response) {
  console.log(response.data);
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
  let weatherdescription = response.data.weather[0].main;
  if (weatherdescription === "Clear") {
    description.innerHTML = "clear";
  }
  if (weatherdescription === "Clouds") {
    description.innerHTML = "cloudy";
  }
  if (weatherdescription === "Rain") {
    description.innerHTML = "rainy";
  }
  if (weatherdescription === "Drizzle") {
    description.innerHTML = "drizzly";
  }
  if (weatherdescription === "Thunderstorm") {
    description.innerHTML = "electric";
  }
  if (weatherdescription === "Snow") {
    description.innerHTML = "snowy";
  }
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityHTML = document.querySelector("#titleCity");
  cityHTML.innerHTML = city.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getWeather);
}

let apiKey = "f81d9102f55557fbaab58670b27ef077";
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
