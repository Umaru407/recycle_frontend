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
  Card,
  CardContent,
  Chip,
  ListItemText,
} from "@mui/material";
import RecycleContext from "../../context/RecycleContext";
import ImageClassify from "../ImageClassify";
import TimeSearch from "../TimeSearch";

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
        //`http://localhost:8080/api/address/${city}`
      );
      setPlaceData(response.data);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setPlaceData(null);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ flex: 0 }}>
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
        <Box  sx={{ flex: 0 }}>
          <TimeSearch />
        </Box>
        <Box sx={{ flex: 0 }}>
          <ImageClassify></ImageClassify>
        </Box>
      </Box>
      <Box sx={{ flex: 1, overflowY: "scroll" }}>
        {loading && <CircularProgress />} {/* 顯示加載指示器 */}
        {/* {cityData && <div></div>} */}
        <Box
          sx={
            {
              /* needs vendor prefixes */
              // overflow: "scroll",
            }
          }
        >
          {placeData && (
            <>
              <List>
                {placeData.map((place) => {
                  //   console.log(place);
                  return (
                    <ListItem key={place._id} sx={{ padding: "4px" }}>
                      <Card variant="outlined" sx={{ width: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {place.factoryname}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                          >
                            <div>地址:{place.formattedAddress}</div>
                            <div>
                              電話:
                              {place.nationalPhoneNumber
                                ? place.nationalPhoneNumber
                                : ""}
                            </div>

                            {place.regularOpeningHours &&
                            place.regularOpeningHours.weekdayDescriptions ? (
                              <div>
                                {place.regularOpeningHours.weekdayDescriptions.map(
                                  (day) => (
                                    <div>{day}</div>
                                  )
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                          </Typography>

                          <Box
                            sx={
                              {
                                //   display: "flex",
                                //   overflowX: "auto",
                                //   maxWidth: "100%",
                              }
                            }
                          >
                            {place.category.map((c, index) => (
                              <Chip
                                key={index}
                                label={c}
                                size="small"
                                sx={{ margin: "3px", fontSize: "10px" }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TaiwanCitySelect;
