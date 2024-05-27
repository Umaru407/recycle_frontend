import React, { useContext, useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { TravelInfoStateContext } from "..";
import { pinIcon } from "./pinIcon";
import RecycleContext from "../../context/RecycleContext";

function MyMap({ mapCenter, placeData }) {
  const map = useMap();
  // const { setFocusSpot } = useContext(TravelInfoStateContext);

  console.log(placeData.length);
  const zoom = placeData.length === 0 ? 8 : 11;

  map.flyTo(mapCenter, zoom, true);
  //   map.on("moveend", () => {
  //     setFocusSpot(null);
  //   });
  return null;
}

export default function Map() {
  const { placeData, setPlaceData } = useContext(RecycleContext);

  //   useEffect(() => {}, [placeData]);

  function calculateCenterPoint(places) {
    if (places.length === 0) {
      return [23.97565, 120.9738819];
    }

    let totalLatitude = 0;
    let totalLongitude = 0;

    // 计算所有经度和纬度的总和
    places.forEach((place) => {
      console.log(place);
      totalLatitude += place.location.latitude;
      totalLongitude += place.location.longitude;
    });

    // 计算平均值
    const avgLatitude = totalLatitude / places.length;
    const avgLongitude = totalLongitude / places.length;

    return [avgLatitude, avgLongitude];
  }

  const center = calculateCenterPoint(placeData);

  const handleClickMarker = (spot) => {
    //   console.log("focusSpot", spot);
    //   setFocusSpot(spot);
    // console.log(markerPosition);
    // setMapCenter(markerPosition);
  };
  const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
  // const position = [51.505, -0.09];

  return (
    <MapContainer
      // center={[51.505, -0.09]}
      center={center}
      zoom={11}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <MyMap mapCenter={center} placeData={placeData} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {placeData.map((place, index) => {
        // console.log('travellist',spot,index)

        // console.log('index',index,[spot.other_info.s_Latitude, spot.other_info.s_Longitude
        // ])

        return (
          <Marker
            position={[place.location.latitude, place.location.longitude]}
            key={index}
            icon={pinIcon(index, color[index])}
            eventHandlers={{
              click: (event) => {
                // console.log(event.containerPoint);
                // handleClickMarker(spot);
              }, // 在点击标记时调用事件处理程序
            }}
          ></Marker>
        );
      })}
      {/* <Marker position={position} icon={iconLocation(props.spot.s_Name)}>
        </Marker> */}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
