import React, { useState, useContext } from "react";
import axios from "axios";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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

const TaiwanCitySelect = () => {
  const {
    selectedCity,
    setSelectedCity,
    placeData,
    setPlaceData,
    loading,
    setLoading,
  } = useContext(RecycleContext);
  //   const [selectedCity, setSelectedCity] = useState("");
  //   const [placeData, setPlaceData] = useState(null);
  //   const [loading, setLoading] = useState(false);

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    setLoading(true);

    try {
      const response = await axios.get(
        `https://recycle-backend.onrender.com/api/address/${city}`
      );
      setPlaceData(response.data);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setPlaceData(null);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      <Typography variant="h6">選擇的城市：{selectedCity}</Typography>
      {loading && <CircularProgress />} {/* 顯示加載指示器 */}
      {/* {cityData && <div></div>} */}
      <Box sx={{ maxHeight: 300, overflow: "auto" }}>
        {placeData && (
          <>
            <List>
              {placeData.map((place) => (
                <ListItem key={place._id}>
                  <ListItemText primary={place.factoryname} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TaiwanCitySelect;
