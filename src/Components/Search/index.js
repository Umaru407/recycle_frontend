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
  Button,
} from "@mui/material";
import RecycleContext from "../../context/RecycleContext";
import ImageClassify from "../ImageClassify";
import TimeSearch from "../TimeSearch";
import LocationSearch from "../LocationSearch";

const TaiwanCitySelect = () => {
  const {
    selectedCity,
    setSelectedCity,
    placeData,
    setPlaceData,
    loading,
    setLoading,
    selectedTime,
    category,
    setCategory,

    setSelectedTime,
  } = useContext(RecycleContext);

  const dayMapping = {
    星期日: 0,
    星期一: 1,
    星期二: 2,
    星期三: 3,
    星期四: 4,
    星期五: 5,
    星期六: 6,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let query = "";
    if (selectedCity != "" && selectedCity != "所有縣市") {
      query += `location=${selectedCity}&`;
    }
    if (selectedTime.length > 0) {
      const result = selectedTime.map((d) => dayMapping[d]).join(",");
      query += `weekdays=${result}&`;
    }

    if (category != "") {
      // const result = category.join(",");
      query += `categories=${category}`;
    }

    console.log(query);

    try {
      console.log(query);
      const response = await axios.get(
        `http://localhost:3000/api/search?${query}`
      );
      setPlaceData(response.data);
      // setError(null);
    } catch (err) {
      if (err.response) {
        // setError(err.response.data.message);
      } else {
        // setError('An error occurred');
      }
    }
    setLoading(false);
  };

  //   const [selectedCity, setSelectedCity] = useState("");
  //   const [placeData, setPlaceData] = useState(null);
  //   const [loading, setLoading] = useState(false);

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
      <form onSubmit={handleSubmit}>
        <Box>
          <Box sx={{ mb: 1 }}>
            <LocationSearch />
          </Box>
          {/* <Typography variant="h6">選擇的城市：{selectedCity}</Typography> */}
          <Box sx={{ mb: 1 }}>
            <TimeSearch />
          </Box>
          <Box sx={{ mb: 1 }}>
            <ImageClassify />
          </Box>
        </Box>

        <Button variant="outlined" type="submit" fullWidth>
          查詢
        </Button>
      </form>
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
