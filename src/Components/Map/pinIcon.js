import L from "leaflet";
// import mapIcon from "./iconmonstr-location-1.svg";

const pinIcon = (index, color) => {
  return new L.DivIcon({
    //iconUrl: mapIcon,
    html: `
      <div style="position:relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32" fill=${
          color ? color : "#FF006E"
        } stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>  
        <span style="
    position:absolute;
    top:26%;
    left:49%;
    transform:translate(-50%, -50%);
    width: 12px; /* 這是圓形的寬度，你可以根據需要調整 */
    height: 12px; /* 這是圓形的高度，應與寬度相同 */
    border-radius: 50%; /* 使元素變成圓形 */
    background-color: #ffffff; /* 圓形的背景色，可以根據需要更改 */
"></span>
      </div>`,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    className: "map-pin",
    // className: 'leaflet-div-icon'
  });
};

export { pinIcon };
