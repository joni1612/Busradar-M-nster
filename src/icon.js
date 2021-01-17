import L from "leaflet";
// import busIconRot from "./assets/bus_rot.svg";
// import busIconGelb from "./assets/bus_gelb.svg";
// import busIconGrün from "./assets/bus_grün.svg";
import stopicon from "./assets/Haltestelle.svg";
import busicon from "./assets/bus.svg";

// const busIconRed = new L.Icon({
//   iconUrl: busIconRot,
//   iconSize: [24, 24],
//   iconAnchor: [12, 12],
//   popupAnchor: [0, -6],
//   className: "leaflet-div-icon",
// });

// const busIconYellow = new L.Icon({
//   iconUrl: busIconGelb,
//   iconSize: [24, 24],
//   iconAnchor: [12, 12],
//   popupAnchor: [0, -6],
//   className: "leaflet-div-icon",
// });

// const busIconGreen = new L.Icon({
//   iconUrl: busIconGrün,
//   iconSize: [24, 24],
//   iconAnchor: [12, 12],
//   popupAnchor: [0, -6],
//   className: "leaflet-div-icon",
// });

const busStopIcon = new L.Icon({
  iconUrl: stopicon,
  iconRetinaUrl: stopicon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});


const busIcon = new L.Icon({
  iconUrl: busicon,
  iconRetinaUrl: busicon,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});
// export { busStopIcon, busIconRed, busIconYellow, busIconGreen };

export {busStopIcon, busIcon}