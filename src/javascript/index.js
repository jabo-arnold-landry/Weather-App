import {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  extractingHoursForTheWeather,
  populatingHeroSectionWithData,
} from "./cardsDisplay.js";
import {
  buttonLoadingState,
  loadingDataState,
} from "./loadingStateSimulator.js";
const form = document.querySelector("form");
const input = document.querySelector("input");
const erroMessage = document.querySelector("#error-message");
const weatherDataSection = document.querySelector("#weather-section");
const searchSection = document.querySelector("main");
const apiErrorSection = document.querySelector("#api-error");
const refreshBtn = apiErrorSection.querySelector("button");
refreshBtn.addEventListener("click", () => location.reload());
function isUserOnline() {
  if (!navigator.onLine) {
    searchSection.hidden = true;
    apiErrorSection.hidden = false;
    return false;
  }
  return true;
}
window.addEventListener("offline", () => {
  isUserOnline();
});
async function getLocation(location) {
  try {
    buttonLoadingState(true);
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    );
    const data = await response.json();
    if (!data.results) {
      return "";
    }
    console.log(data);
    return {
      country: data.results[0].country,
      city: data.results[0].name,
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  } catch (err) {
    console.log("Somthing went wrong:", err);
    isUserOnline();
  } finally {
    buttonLoadingState(false);
  }
}
let tempUnits = "celsius";
let windSpeedUnits = "kmh";
let precipitationUnits = "mm";
async function weatherInformation(lat, lon) {
  try {
    if (!isUserOnline()) return;
    loadingDataState(true);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&temperature_unit=${tempUnits}&wind_speed_unit=${windSpeedUnits}&precipitation_unit=${precipitationUnits}`
    );
    const weatherData = await response.json();
    const generalInfo = {
      "feels like": [
        weatherData.current.temperature_2m,
        weatherData.current_units.temperature_2m,
      ],
      humidity: [
        weatherData.current.relative_humidity_2m,
        weatherData.current_units.relative_humidity_2m,
      ],
      windSpeed: [
        weatherData.current.wind_speed_10m,
        weatherData.current_units.wind_speed_10m,
      ],
      precipitation: [
        weatherData.current.precipitation,
        weatherData.current_units.precipitation,
      ],
    };

    displayGeneralWeatherInformation(generalInfo);
    sevenDaysForecastDisplay(
      weatherData.daily.temperature_2m_max,
      weatherData.daily.temperature_2m_min,
      weatherData.daily.weather_code
    );
    extractingHoursForTheWeather(
      weatherData.hourly.time,
      weatherData.hourly.weather_code,
      weatherData.hourly.temperature_2m
    );
    return {
      temperature: weatherData.current.temperature_2m,
      time: weatherData.current.time,
      weatherCode: weatherData.current.weather_code,
      isDay: weatherData.current.is_day,
    };
  } catch (err) {
    console.log("something bad happened: ", err);
  } finally {
    loadingDataState(false);
  }
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!input.value) return alert("not something we can do");

  const { lat, lon, country, city } = await getLocation(input.value);
  if (!lon) {
    erroMessage.innerHTML = "no search results found !";
    weatherDataSection.hidden = true;
    return;
  }
  weatherInformation(lat, lon);
  weatherDataSection.hidden = false;
  const { temperature, weatherCode, isDay, time } = await weatherInformation(
    lat,
    lon
  );
  populatingHeroSectionWithData({
    temperature,
    weatherCode,
    isDay,
    time,
    country,
    city,
  });
});

const unitDropDownTrigger = document.querySelector("#unit-drop-down-trigger");
const unitsCardSection = document.querySelector("#units-cards-section");
unitDropDownTrigger.addEventListener("click", () =>
  unitsCardSection.classList.toggle("hidden")
);

const temperatureDatas = document.querySelector("[data-temp]");
const windDataSpeed = document.querySelector("[data-wind]");
const precipitation = document.querySelector("[data-perc]");
//listener for temperature unit change
temperatureDatas.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    handlerFortheUserSelectedUnit(this, e.target, tempUnits);
  }
});
//listener for windspeed unit change
windDataSpeed.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    handlerFortheUserSelectedUnit(this, e.target, windSpeedUnits);
  }
});
//listener for percipitation unit change
precipitation.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    handlerFortheUserSelectedUnit(this, e.target, precipitationUnits);
  }
});
//this will be called on each unit section to handle each unit independently and correcttly switch the right unit and also higlight it wit the checkmark
function handlerFortheUserSelectedUnit(parentElement, target, unitToChange) {
  const images = parentElement.querySelectorAll("img");

  images.forEach((image) => {
    image.classList.add("hidden");
  });
  unitToChange = target.dataset.unit;
  target.querySelector("img").classList.remove("hidden");
}
