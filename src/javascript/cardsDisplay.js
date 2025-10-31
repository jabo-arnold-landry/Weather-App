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
import { timeTransformation } from "./iconsList.js";
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
    div.classList.add("bg-Neutral-700", "pr-8", "pl-5", "mx-2", "rounded-md");
    div.innerHTML += `
      <h2 class="text-md text-Neutral-300">${keys}</h2
       <p class="text-lg text-Neutral-0 font-bold">${parseInt(
         weatherValue
       )} ${valueUnit}</p>
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
    div.classList.add(
      "grid",
      "gap-1",
      "bg-Neutral-700",
      "rounded-lg",
      "px-2",
      "py-3"
    );
    div.innerHTML = `
    <h3 class="capitalize font-bold text-md">${daysofWeek[i]}</h3>
    <img src='${imgIcon}' alt="weather status image" class="size-20" >
    <section class="flex gap-2.5 px-1">
      <span>${parseInt(maxTempForecast)}<sup>o</sup></span>
      <span>${parseInt(minTempForecast)}<sup>o</sup></span>
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
  const hoursOnly = hourlyForecast.map((element) => {
    return element.split("T")[1];
  });
  const currHour = `${new Date().getHours().toString().padstart(2, "0")}:00`;
  const groupedByDay = {}
  hourlyForecast.forEach((timestamp, index)=>{
    const todaysDate = new Date();
    const todayDays = daysofWeek[todaysDate.getDay()]
    if(!groupedByDay[todayDays]) return
    groupedByDay[todayDays] = {
      time: [],
      weatherCode: [],
      temperature: []
    }
    const startIndex = hourlyForecast.findIndex(h=> h === currHour);
  })
  const currHourIndex = hoursOnly.findIndex((hour) => hour === currHour);
  for (let i = 0; i < 7; i++) {
    dailyChunks[daysofWeek[i]] = {
      time: hoursOnly.slice(currHourIndex, currHourIndex + 9),
      weatherCode: hourlyWeatherCode.slice(currHourIndex, currHourIndex + 9),
      temperature: hourlyTemperature.slice(currHourIndex, currHourIndex + 9),
    };
  }
  filteringHourlyData("monday", dailyChunks);
  return dailyChunks;
}
function filteringHourlyData(day = "monday", obj) {
  const docFragment = document.createDocumentFragment();
  const { weatherCode, time, temperature } = obj[day];
  daysList.classList.toggle("hidden");
  daysList.innerHTML = "";
  daysofWeek.forEach((day) => {
    daysList.innerHTML += `<button class="capitalize hover:bg-Neutral-600 hover:w-full cursor-pointer">${day}</button>`;
  });
  // console.log([weatherCode, time, temperature]);
  hourlDataSection.innerHTML = "";
  for (let i = 0; i < time.length; i++) {
    let { hour } = timeTransformation(time[i]);
    const hourIcon = weatherIcon(weatherCode[i]);
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "bg-Neutral-600",
      "mt-4",
      "mx-1",
      "px-3",
      "rounded-md"
    );
    div.innerHTML = `
          <div class="flex items-center gap-2">
            <img
              src="${hourIcon}"
              alt="weather code"
              class="size-12 inlin-block"
            />
            <time datetime="now">${time[i]}</time>
          </div>
          <p>${parseInt(temperature[i])}<sup>o</sup></p>`;
    docFragment.append(div);
  }
  hourlDataSection.append(docFragment);
}
function populatingHeroSectionWithData(obj) {
  const { temperature, weatherCode, isDay, time, country, city } = obj;
  let { date } = timeTransformation(time);
  let imgSrc = weatherIcon(weatherCode);
  HeroSection.innerHTML = "";
  HeroSection.innerHTML = `  <div class="grid place-content-center">
            <strong class="text-2xl font-bold">${city}, ${country}</strong>
            <p class="text-md font-light text-center sm:text-left">
              ${date}
            </p>
          </div>
           <div class="flex items-center py-4">
            <img
              src="${imgSrc}"
              alt="weather icon"
              class="size-20 sm:size-36"
            />
            <span class="text-4xl sm:text-6xl">${parseInt(
              temperature
            )}<sup>o</sup></span>
          </div>
  `;
}
daysDropDownMenu.addEventListener("click", () => {
  daysList.classList.toggle("hidden");
});

daysList.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    filteringHourlyData(e.target.textContent, dailyChunks);
    daysDropDownMenu.innerHTML = `${e.target.textContent} <img src="/images/icon-dropdown.svg" alt="dropdown icon" />`;
    daysList.hidden = true ? false : true;
  }
});
export {
  displayGeneralWeatherInformation,
  sevenDaysForecastDisplay,
  extractingHoursForTheWeather,
  populatingHeroSectionWithData,
};
