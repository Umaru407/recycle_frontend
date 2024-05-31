import logo from "./logo.svg";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Home from "./Views/Home";
import { useContext, useState } from "react";
import RecycleContext from "./context/RecycleContext";
import ImageClassify from "./Components/ImageClassify";

// 创建一个 Context
// export const RecycleContext = React.createContext();

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <RecycleContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        placeData,
        setPlaceData,
        loading,
        setLoading,
      }}
    >
      {/* <ImageClassify /> */}
      <Home />
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
