import React, { useState, useContext, useRef } from "react";
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
  Skeleton,
  FormControlLabel,
  Switch,
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
    setMapReset,
    coordinatesChecked,
    setCoordinatesChecked,
    setCoordinates,
    coordinates,

    setSelectedTime,

    scrollToIndex,
    listRef,
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
    // scrollToIndex(5);
    e.preventDefault();
    setLoading(true);
    // setPlaceData([])
    let query = "";
    if (selectedCity != "" && selectedCity != "所有縣市") {
      query += `location=${selectedCity}&`;
    }
    if (selectedTime.length > 0) {
      const result = selectedTime.map((d) => dayMapping[d]).join(",");
      query += `weekdays=${result}&`;
    }

    if (category !== "") {
      // const result = category.join(",");
      query += `categories=${category}&`;
    }

    if (coordinatesChecked) {
      query += `latitude=${coordinates[0]}&`;
      query += `longitude=${coordinates[1]}&`;
    }

    console.log(query);

    try {
      console.log(query);
      const response = await axios.get(
        `https://recycle-backend.onrender.com/api/search?${query}`
        // `http://localhost:3002/api/search?${query}`
      );
      setPlaceData(response.data);
      console.log(response.data);
      // setError(null);
    } catch (err) {
      console.log(err);
      setPlaceData([]);
    }
    setLoading(false);
    setMapReset(true);
    // scrollToIndex(5);
  };

  const handleAutoRecommendChange = (event) => {
    setCoordinatesChecked(false);
    const daysOfWeek = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    const dayOfWeek = daysOfWeek[new Date().getDay()]; // 0 表示星期日，依此类推

    if (!coordinatesChecked) {
      const successHandler = (position) => {
        console.log(position, "@@");
        setCoordinates([position.coords.latitude, position.coords.longitude]);
        setCoordinatesChecked(true);
        setSelectedCity("所有縣市");
        setSelectedTime([dayOfWeek]);

        // new Date().getDay()
      };

      const errorHandler = (error) => {
        console.log(error, "@@");
        // setError(error.message);
        setCoordinatesChecked(false);
      };

      if (navigator.geolocation && !coordinatesChecked) {
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      } else {
        // setError("Geolocation is not supported");
        setCoordinatesChecked(false);
      }
    }
  };

  // const listRef = useRef(null);

  // const scrollToIndex = (index) => {
  //   const itemRef = listRef.current.children[index];
  //   if (itemRef) {
  //     itemRef.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

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
          <FormControlLabel
            control={
              <Switch
                checked={coordinatesChecked}
                onChange={handleAutoRecommendChange}
                // name="gilad"
              />
            }
            label="使用當前位置、星期自動推薦回收站"
          />
          <Box sx={{ mb: 1 }}>
            <ImageClassify />
          </Box>
        </Box>

        <Button variant="outlined" type="submit" fullWidth>
          查詢
        </Button>
      </form>
      <Box sx={{ flex: 1, overflowY: "scroll" }}>
        {loading && (
          <Box sx={{ marginTop: 1 }}>
            <Skeleton
              sx={{ marginBottom: 1 }}
              variant="rounded"
              width={"100%"}
              height={200}
            />
            <Skeleton
              sx={{ marginBottom: 1 }}
              variant="rounded"
              width={"100%"}
              height={200}
            />
            <Skeleton
              sx={{ marginBottom: 1 }}
              variant="rounded"
              width={"100%"}
              height={200}
            />
          </Box>
        )}{" "}
        {/* 顯示加載指示器 */}
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
              <List ref={listRef}>
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
