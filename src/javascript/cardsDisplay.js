const generalInfoSection = document.querySelector("#general-info-section");
const dailyForecastSection = document.querySelector("#daily-forecast-section");
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
const daysofWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
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

function displayHourlyForecast(hourlyForecast) {
  const dailyChunks = [];
  for (let i = 0; i < 7; i++) {
    const start = i * 24;
    const end = start + 24;
    dailyChunks.push(hourlyForecast.slice(start, end));
  }
  console.log(dailyChunks);
}
export {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  displayHourlyForecast,
};
