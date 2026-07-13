import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

let mapInstance = null;
let markerInstance = null;

export function initMap(containerId = "map", data = null) {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }

  const container = document.getElementById(containerId);
  if (!container) return null;

  let lng = 37.6173;
  let lat = 55.7558;
  let zoom = 10;

  if (data?.location?.lat && data?.location?.lng) {
    lat = data.location.lat;
    lng = data.location.lng;
    zoom = 12;
  }

  mapInstance = new maplibregl.Map({
    container: containerId,
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: [lng, lat],
    zoom: zoom,
  });

  mapInstance.on("load", () => {
    addMarker(mapInstance, data);
  });

  return mapInstance;
}

export function updateMap(data) {
  if (!mapInstance) {
    initMap("map", data);
    return;
  }

  if (data?.location?.lat && data?.location?.lng) {
    const { lat, lng } = data.location;
    mapInstance.flyTo({
      center: [lng, lat],
      zoom: 12,
      essential: true,
    });
    addMarker(mapInstance, data);
  }
}

function addMarker(map, data) {
  if (!data?.location?.lat || !data?.location?.lng) return;

  const { lat, lng, city, country, region } = data.location;

  if (markerInstance) {
    markerInstance.remove();
  }

  markerInstance = new maplibregl.Marker({
    color: "#FF6B6B",
    scale: 1.3,
  })
    .setLngLat([lng, lat])
    .setPopup(
      new maplibregl.Popup({
        offset: 30,
        closeButton: true,
      }),
    )
    .addTo(map);
}
