import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import RecycleContext from "../../context/RecycleContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const ImageClassify = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const {
    selectedCity,
    setSelectedCity,
    placeData,
    setPlaceData,
    loading,
    setLoading,
  } = useContext(RecycleContext);

  useEffect(() => {
    if (result) handleResultChange();
  }, [result]);

  const handleResultChange = async (event) => {
    // const city = event.target.value;
    // setSelectedCity(city);

    console.log(result);
    try {
      const response = await axios.get(
        // `https://recycle-backend.onrender.com/api/categories/${result}`
        `http://localhost:3000/api/categories/${result}`
      );
      setPlaceData(response.data);
    } catch (error) {
      console.error("Error fetching city data:", error);
      setPlaceData(null);
    }

    setLoading(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const localUrl = URL.createObjectURL(file);
      setLocalImageUrl(localUrl);
    }

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/getClassify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.result); // 假設後端返回上傳的圖片URL
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  //   const handleCategoryChange = async (event) => {
  //     const city = event.target.value;
  //     setSelectedCity(city);
  //     setLoading(true);

  //     try {
  //       const response = await axios.get(
  //         `https://recycle-backend.onrender.com/api/address/${city}`
  //         //`http://localhost:8080/api/address/${city}`
  //       );
  //       setPlaceData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching city data:", error);
  //       setPlaceData(null);
  //     }

  //     setLoading(false);
  //   };

  return (
    <Box
      sx={{
        // width: "100%",

        padding: 2,
      }}
      //   onClick={handleFileChange}
    >
      <Typography variant="h6">上傳回收物</Typography>
      <Box>
        <Typography variant="h6">Selected Image:</Typography>
        <Box sx={{ height: "200px", width: "100%" }}>
          {!localImageUrl && <>img</>}

          {localImageUrl && (
            <img
              src={localImageUrl}
              alt="Selected"
              style={{ height: "200px" }}
            />
          )}
        </Box>
      </Box>

      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        // startIcon={<CloudUploadIcon />}
        onChange={handleFileChange}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>

      {result && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">可能的分類</Typography>
          {result}
          {/* <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} /> */}
        </Box>
      )}
    </Box>
  );
};

export default ImageClassify;
