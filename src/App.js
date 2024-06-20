import logo from "./logo.svg";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Home from "./Views/Home";
import { useContext, useState, useEffect, useRef } from "react";
import RecycleContext from "./context/RecycleContext";
import ImageClassify from "./Components/ImageClassify";
import { Switch, FormControlLabel } from "@mui/material";

// 创建一个 Context
// export const RecycleContext = React.createContext();

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState([]);
  const [category, setCategory] = useState("");
  const [mapReset, setMapReset] = useState(false);
  const [coordinates, setCoordinates] = useState([null, null]);
  const [error, setError] = useState(null);
  const [coordinatesChecked, setCoordinatesChecked] = useState(false);

  // useEffect(() => {
  //   const successHandler = (position) => {
  //     setCoordinates([position.coords.latitude, position.coords.longitude]);
  //   };

  //   const errorHandler = (error) => {
  //     setError(error.message);
  //   };

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  //   } else {
  //     setError("Geolocation is not supported");
  //   }
  // }, []);

  const handleChange = (event) => {
    setCoordinatesChecked(false);
    const successHandler = (position) => {
      console.log(position, "@@");
      setCoordinates([position.coords.latitude, position.coords.longitude]);
      setCoordinatesChecked(true);
    };

    const errorHandler = (error) => {
      console.log(error, "@@");
      setError(error.message);
      setCoordinatesChecked(false);
    };

    if (navigator.geolocation && !coordinatesChecked) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      setError("Geolocation is not supported");
      setCoordinatesChecked(false);
    }
  };

  const listRef = useRef(null);

  const scrollToIndex = (index) => {
    // console.log("@@@@@",listRef)
    const itemRef = listRef.current.children[index];
    if (itemRef) {
      // console.log(itemRef)
      itemRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <RecycleContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        placeData,
        setPlaceData,
        loading,
        setLoading,
        selectedTime,
        setSelectedTime,
        category,
        setCategory,
        mapReset,
        setMapReset,
        coordinates,
        setCoordinates,
        coordinatesChecked,
        setCoordinatesChecked,
        scrollToIndex,
        listRef,
      }}
    >
      {/* <ImageClassify /> */}
      <Home />
      {/* {error && <p>Error: {error}</p>} */}
      {/* {coordinates[0] && coordinates[1] && (
        <p>
          Coordinates: [{coordinates[0]}, {coordinates[1]}]
        </p>
      )}
      <FormControlLabel
        control={
          <Switch
            checked={coordinatesChecked}
            onChange={handleChange}
            // name="gilad"
          />
        }
        label="使用現在位置推薦"
      /> */}
    </RecycleContext.Provider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
