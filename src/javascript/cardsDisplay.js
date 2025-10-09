const generalInfoSection = document.querySelector("#general-info-section");
const dailyForecastSection = document.querySelector("#daily-forecast-section");

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
function sevenDaysForecastDisplay(maxWeekForecasts, minWeekForecasts) {
  let docFragment = document.createDocumentFragment();
  dailyForecastSection.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    const maxTempForecast = maxWeekForecasts[i];
    const minTempForecast = minWeekForecasts[i];
    div.innerHTML = `
    <h3>${daysofWeek[i]}</h3>
    <img src='' alt="weather status image" >
    <section>
      <span>${maxTempForecast}<sup>o</sup></span>
      <span>${minTempForecast}<sup>o</sup></span>
    </section>`;
    docFragment.append(div);
  }
  dailyForecastSection.append(docFragment);
}
export { displayGeneralWeatherInformation, sevenDaysForecastDisplay };
