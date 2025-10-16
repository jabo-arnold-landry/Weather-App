const generalInfoSection = document.querySelector("#general-info-section");
const dailyForecastSection = document.querySelector("#daily-forecast-section");
const hourlyForecastSection = document.querySelector(
  "#hourly-forecast-section"
);
const daysDropDownMenu = hourlyForecastSection.querySelector("button");
const daysList = document.querySelector("#days-list");
const hourlDataSection = document.querySelector("#hourly-data");
const HeroSection = document.querySelector("#location-info");
import weatherIcon from "./iconsList.js";
const daysofWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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
const dailyChunks = {};
function extractingHoursForTheWeather(
  hourlyForecast,
  hourlyWeatherCode,
  hourlyTemperature
) {
  for (let i = 0; i < 7; i++) {
    const startIndex = i * 24 + 15; // getting hours at 3pm
    const endIndex = i * 24 + 22; //getting hours at 10pm

    dailyChunks[daysofWeek[i]] = {
      time: hourlyForecast.slice(startIndex, endIndex),
      weatherCode: hourlyWeatherCode.slice(startIndex, endIndex),
      temperature: hourlyTemperature.slice(startIndex, endIndex),
    };
  }
  filteringHourlyData("monday", dailyChunks);
  return dailyChunks;
}
function filteringHourlyData(day = "monday", obj) {
  const docFragment = document.createDocumentFragment();
  const { weatherCode, time, temperature } = obj[day];
  daysList.classList.toggle("hidden");
  console.log([weatherCode, time, temperature]);
  for (let i = 0; i < 7; i++) {
    hourlDataSection.innerHTML = "";
    const hourIcon = weatherIcon(weatherCode[i]);
    const div = document.createElement("div");
    div.classList.add("flex", "items-center", "justify-between");
    div.innerHTML = `
          <div class="flex items-center">
            <img
              src="${hourIcon}"
              alt="weather code"
              class="size-13 inlin-block"
            />
            <time datetime="now">${time[i]}</time>
          </div>
          <p>${temperature[i]}<sup>o</sup></p>`;
    docFragment.append(div);
  }
  hourlDataSection.append(docFragment);
}
function populatingHeroSectionWithData(obj) {
  const { temperature, weatherCode, isDay, time, country, city } = obj;
  let imgSrc = weatherIcon(weatherCode);
  HeroSection.innerHTML = "";
  HeroSection.innerHTML = `<div>
    <strong>${city}, ${country}</strong>
    <p>${time}</p>
   </div>
   <div class="">
    <img src="${imgSrc}"alt="weather icon" class="size-1/4 sm:size-3/4"/>
   <span>${temperature}<sup>o</sup></span>
  </div>
  `;
}
daysDropDownMenu.addEventListener("click", () => {
  daysList.classList.toggle("hidden");
});
daysList.innerHTML = "";
daysofWeek.forEach((day) => {
  daysList.innerHTML += `<button>${day}</button>`;
});

daysList.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    daysList.classList.toggle("hidden");
    filteringHourlyData(e.target.textContent, dailyChunks);
    daysDropDownMenu.innerHTML = `${e.target.textContent} <img src="/images/icon-dropdown.svg" alt="dropdown icon" />`;
  }
});
export {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  extractingHoursForTheWeather,
  populatingHeroSectionWithData,
};
