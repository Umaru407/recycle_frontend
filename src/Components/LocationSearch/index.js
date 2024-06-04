import React, { useState, useContext } from "react";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import RecycleContext from "../../context/RecycleContext";

const taiwanCities = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

export default function LocationSearch() {
  const [selectedTime, setSelectedTime] = React.useState([]);
  const [dayData, setDayData] = React.useState(null);

  const {
    selectedCity,
    setSelectedCity,
    placeData,
    setPlaceData,
    loading,
    setLoading,
  } = useContext(RecycleContext);

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    // setLoading(true);

    // try {
    //   const response = await axios.get(
    //     `https://recycle-backend.onrender.com/api/address/${city}`
    //     //`http://localhost:8080/api/address/${city}`
    //   );
    //   setPlaceData(response.data);
    // } catch (error) {
    //   console.error("Error fetching city data:", error);
    //   setPlaceData(null);
    // }

    // setLoading(false);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="taiwan-city-select-label">選擇縣市</InputLabel>
        <Select
          labelId="taiwan-city-select-label"
          id="taiwan-city-select"
          value={selectedCity}
          label="選擇縣市"
          onChange={handleCityChange}
        >
          {taiwanCities.map((city, index) => (
            <MenuItem key={index} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
