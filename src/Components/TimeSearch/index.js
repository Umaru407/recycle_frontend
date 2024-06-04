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
import { Tooltip } from "@mui/material";


// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const days = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];
const allDays = "全選";

export default function TimeSearch() {
  // const [selectedTime, setSelectedTime] = React.useState([]);
  // const [dayData, setDayData] = React.useState(null);

  const {
    placeData,
    setPlaceData,
    loading,
    setLoading,
    selectedTime,
    setSelectedTime,
  } = useContext(RecycleContext);

  // const handleWeekChange = async (event) => {
  //   const day = event.target.value;
  //   setSelectedTime(day);
  // setLoading(true);
  // // console.log( day);
  // const dayMapping = {
  //   星期一: 1,
  //   星期二: 2,
  //   星期三: 3,
  //   星期四: 4,
  //   星期五: 5,
  //   星期六: 6,
  //   星期日: 0,
  // };
  // const result = day.map((d) => dayMapping[d]).join(",");

  // console.log("result", result);
  // try {
  //   const response = await axios.get(
  //     `http://localhost:3000/api/opening-weekday/?days=${result}`
  //   );
  //   setPlaceData(response.data);
  //   console.log("data", response.data.length);
  // } catch (error) {
  //   console.error("Error fetching Day data:", error);
  //   // setDayData(null);
  // }

  // setLoading(false);
  // };
  const handleWeekChange = (event) => {
    const value = event.target.value;
    if (value.includes(allDays)) {
      if (selectedTime.length === days.length) {
        setSelectedTime([]);
      } else {
        setSelectedTime(days);
      }
    } else {
      setSelectedTime(value);
    }
  };

  const isAllSelected = selectedTime.length === days.length;

  const renderValue = (selected) => {
    if (selected.length === 0) {
      return <span>選擇星期</span>;
    }
    const displayedValues =
      selected.length > 5
        ? `${selected.slice(0, 5).join(", ")}...`
        : selected.join(", ");
    return (
      <Tooltip title={selected.join(", ")}>
        <span>{displayedValues}</span>
      </Tooltip>
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-checkbox-label">選擇星期</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selectedTime}
        onChange={handleWeekChange}
        input={<OutlinedInput label="選擇星期" />}
        renderValue={renderValue}
      >
        <MenuItem value={allDays}>
          <Checkbox checked={isAllSelected} />
          <ListItemText primary={allDays} />
        </MenuItem>
        {days.map((day) => (
          <MenuItem key={day} value={day}>
            <Checkbox checked={selectedTime.indexOf(day) > -1} />
            <ListItemText primary={day} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
