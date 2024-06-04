import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Icon,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import RecycleContext from "../../context/RecycleContext";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  // zIndex: 100,
  width: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  // width: 1,
});
const ImageClassify = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [result, setResult] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const {
    selectedCity,
    setSelectedCity,
    placeData,
    setPlaceData,
    loading,
    setLoading,
    category, setCategory
  } = useContext(RecycleContext);

  // useEffect(() => {
  //   if (result) handleResultChange();
  // }, [result]);

  // const handleResultChange = async (event) => {
  //   // const city = event.target.value;
  //   // setSelectedCity(city);

  //   console.log(result);
  //   try {
  //     const response = await axios.get(
  //       // `https://recycle-backend.onrender.com/api/categories/${result}`
  //       `http://localhost:3000/api/categories/${result}`
  //     );
  //     setPlaceData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching city data:", error);
  //     setPlaceData(null);
  //   }

  //   setLoading(false);
  // };

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
        "http://localhost:3000/getClassify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCategory(response.data.result); 
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
    setLoading(false);
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
    <Card
      variant="outlined"
      // sx={{
      //   // width: "100%",
      //   border: "1px solid #ccc",
      //   padding: 2,
      // }}
      //   onClick={handleFileChange}
    >
      <CardActionArea
        onChange={handleFileChange}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      >
        <CardContent>
          {/* <Typography variant="h6">Selected Image:</Typography> */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                height: "140px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {localImageUrl == "" ? (
                <>
                  {" "}
                  <UploadFileIcon
                    sx={{ fontSize: "80px" }}
                  ></UploadFileIcon>{" "}
                  <Typography variant="h6">上傳回收物</Typography>
                  <VisuallyHiddenInput type="file" />
                </>
              ) : (
                <>
                  <img
                    src={localImageUrl}
                    alt="Selected"
                    style={{ height: "80px" }}
                  />
                  {category && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6">可能的分類</Typography>
                      {category}
                      
                      {/* <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} /> */}
                    </Box>
                    
                  )}
                   <VisuallyHiddenInput type="file" />
                </>
              )}
            </Box>
          </Box>
          {/* <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            // startIcon={<CloudUploadIcon />}
            onChange={handleFileChange}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageClassify;
