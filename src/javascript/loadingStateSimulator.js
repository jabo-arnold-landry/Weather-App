const form = document.querySelector("form");
const btn = form.querySelector("button");
const dataLoadingState = document.querySelector("#loading-state-section");
function buttonLoadingState(state) {
  if (state) {
    btn.disabled = true;
    btn.innerHTML += `<img
                src="/images/icon-loading.svg"
                alt="loading-effects-icon"
                class="px-2 animate-spin"
              />`;
    return;
  }
  btn.textContent = "Search";
  btn.disabled = false;
}
function loadingDataState(state) {
  if (state) dataLoadingState.hidden = false;
  if (!state) dataLoadingState.hidden = true;
  return;
}
export { buttonLoadingState, loadingDataState };
