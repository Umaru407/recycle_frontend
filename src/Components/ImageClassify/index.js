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
  Container,
  Skeleton,
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
  const [loading, setLoading] = useState(false);
  const [localImageUrl, setLocalImageUrl] = useState("");
  const { category, setCategory } = useContext(RecycleContext);

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
        // "http://localhost:3000/getClassify",
        "https://recycleclassify-esci3h3qia-de.a.run.app/getClassify",
        // "http://localhost:3000/getClassify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCategory(response.data.result);
      // alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
    setLoading(false);
  };

  const resetImage = () => {
    setLocalImageUrl("");
    setSelectedFile("");
    setCategory("");
  };

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={resetImage}
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
                <Container
                  sx={{
                    display: "flex",
                    height: "100%",
                    // width: "100%",
                    justifyContent: "space-around",
                    // alignItems: "center",
                  }}
                >
                  <img
                    src={localImageUrl}
                    alt="Selected"
                    style={{ height: "100%" }}
                  />

                  {category ? (
                    <Box sx={{ width: "120px", paddingLeft: 1 }}>
                      <Typography variant="h6">可能的分類</Typography>
                      {category}

                      {/* <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} /> */}
                    </Box>
                  ) : (
                    <Box sx={{ width: "120px", paddingLeft: 1 }}>
                      <Typography variant="h6">可能的分類</Typography>
                      <Skeleton variant="h6" width={"100%"} height={"60px"} />
                    </Box>
                  )}
                  <VisuallyHiddenInput type="file" />
                </Container>
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
