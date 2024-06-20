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
    coordinatesChecked
  } = useContext(RecycleContext);

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
        disabled = {coordinatesChecked}
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
