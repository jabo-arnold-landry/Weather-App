const generalInfoSection = document.querySelector("#general-info-section");

function displayGeneralWeatherInformation(obj) {
  generalInfoSection.innerHTML = "";
  const docFragment = document.createDocumentFragment();
  for (let keys in obj) {
    const div = document.createElement("div");
    div.innerHTML += `
      <h2>${keys}</h2
      <p>${obj[keys][0]} ${obj[keys][1]}</p>
    `;
    docFragment.append(div);
  }
  generalInfoSection.append(docFragment);
}
export { displayGeneralWeatherInformation };
