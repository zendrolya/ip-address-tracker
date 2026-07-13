import { validateIp } from "./validate-ip";
import { updateMap, initMap } from "./map";
const GEO_IPIFY_API_KEY = import.meta.env.GEO_IPIFY_API_KEY;

const seacrhForm = document.querySelector(".header__form");
const ipInput = document.querySelector(".header__input");
const mapArea = document.getElementById("map");

seacrhForm.addEventListener("submit", handleSubmit);
ipInput.addEventListener("keydown", handleEnter);

document.addEventListener("DOMContentLoaded", () => {
  initMap("map");
});

function handleSubmit(evt) {
  evt.preventDefault();
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${GEO_IPIFY_API_KEY}&ipAddress=${ipInput.value}`,
    )
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }
}

function handleEnter(evt) {
  if (evt.key === "Enter") handleSubmit();
}

function setInfo(data) {
  const ipInfo = document.getElementById("ip");
  const locationInfo = document.getElementById("location");
  const timezoneInfo = document.getElementById("timezone");
  const ispInfo = document.getElementById("isp");

  ipInfo.textContent = data.ip;
  const locationParts = [
    data.location.region,
    data.location.city,
    data.location.postalCode,
  ].filter(Boolean);

  locationInfo.textContent =
    locationParts.length > 0 ? locationParts.join(", ") : "-";
  timezoneInfo.textContent = data.location.timezone
    ? data.location.timezone
    : "00:00";
  ispInfo.textContent = data.isp ? data.isp : "-";

  updateMap(data);
}
