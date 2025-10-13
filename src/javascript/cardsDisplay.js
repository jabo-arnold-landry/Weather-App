const generalInfoSection = document.querySelector("#general-info-section");
const dailyForecastSection = document.querySelector("#daily-forecast-section");
const hourlyForecastSection = document.querySelector(
  "#hourly-forecast-section"
);
const daysDropDownMenu = hourlyForecastSection.querySelector("button");
const daysList = document.querySelector("#days-list");
const hourlData = document.querySelector("#hourly-data");
const daysofWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
import weatherIcon from "./iconsList.js";

function displayGeneralWeatherInformation(obj) {
  const docFragment = document.createDocumentFragment();
  generalInfoSection.innerHTML = "";
  for (let keys in obj) {
    const div = document.createElement("div");
    const weatherValue = obj[keys][0];
    const valueUnit = obj[keys][1];
    div.innerHTML += `
      <h2>${keys}</h2
      <p>${weatherValue} ${valueUnit}</p>
    `;
    docFragment.append(div);
  }
  generalInfoSection.append(docFragment);
}

function sevenDaysForecastDisplay(
  maxWeekForecasts,
  minWeekForecasts,
  weatherCode
) {
  let docFragment = document.createDocumentFragment();
  dailyForecastSection.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    const maxTempForecast = maxWeekForecasts[i];
    const minTempForecast = minWeekForecasts[i];
    const imgIcon = weatherIcon(weatherCode[i]);
    div.innerHTML = `
    <h3>${daysofWeek[i]}</h3>
    <img src='${imgIcon}' alt="weather status image" >
    <section>
      <span>${maxTempForecast}<sup>o</sup></span>
      <span>${minTempForecast}<sup>o</sup></span>
    </section>`;
    docFragment.append(div);
  }
  dailyForecastSection.append(docFragment);
}

function extractingHoursForTheWeather(
  hourlyForecast,
  hourlyWeatherCode,
  hourlyTemperature
) {
  const dailyChunks = [];
  for (let i = 0; i < 7; i++) {
    const startIndex = 24 - 9;
    const endIndex = startIndex + 7;
    const obj = {};
    obj[daysofWeek[i]] = {
      time: hourlyForecast.slice(startIndex, endIndex),
      weatherCode: hourlyWeatherCode.slice(startIndex, endIndex),
      temperature: hourlyTemperature.slice(startIndex, endIndex),
    };
    dailyChunks.push(obj);
  }
}
daysDropDownMenu.addEventListener("click", () => {
  daysList.classList.toggle("hidden");
});
daysList.innerHTML = "";
daysofWeek.forEach((day) => {
  daysList.innerHTML += `<button>${day}</button>`;
});
function displayingHourlyData(day, obj) {
  const hourlyData = obj[day];
}
daysList.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    alert(e.target.textContent);
    displayingHourlyData(e.target.textContent, dataSet);
    daysDropDownMenu.innerHTML = `${e.target.textContent} <img src="/images/icon-dropdown.svg" alt="dropdown icon" />`;
    daysList.classList.toggle("hidden");
  }
});
export {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  extractingHoursForTheWeather,
};
