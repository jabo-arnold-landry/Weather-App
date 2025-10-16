import {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  extractingHoursForTheWeather,
} from "./cardsDisplay.js";
const form = document.querySelector("form");
const input = document.querySelector("input");
const erroMessage = document.querySelector("#error-message");
const weatherDataSection = document.querySelector("#weather-section");
async function getLocation(location) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    );
    const data = await response.json();
    if (!data.results) {
      return "";
    }
    return {
      country: data.results[0].country,
      city: data.results[0].name,
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  } catch (err) {
    console.log("Somthing went wrong:", err);
  }
}
async function weatherInformation(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code`
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
    console.log(weatherData);
  } catch (err) {
    console.log("something bad happened: ", err);
  }
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!input.value) return alert("not something we can do");
  const { lat, lon } = await getLocation(input.value);
  if (!lon) {
    erroMessage.innerHTML = "no search results found !";
    weatherDataSection.hidden = true;
    return;
  }
  weatherInformation(lat, lon);
  weatherDataSection.hidden = false;
});
