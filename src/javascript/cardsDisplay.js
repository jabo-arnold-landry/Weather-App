const generalInfoSection = document.querySelector("#general-info-section");

function displayGeneralWeatherInformation(obj) {
  generalInfoSection.innerHTML = "";
  const docFragment = document.createDocumentFragment();
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

function sevenDaysForecastDisplay() {}
export { displayGeneralWeatherInformation };
