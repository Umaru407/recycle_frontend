import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import axios from "axios";

const ImageClassify = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:8080/getClassify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.result); // 假設後端返回上傳的圖片URL
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload an Image
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleFileChange} sx={{ mb: 2 }} />
        <Button variant="contained" color="primary" type="submit">
          Upload
        </Button>
      </form>
      {imageUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Uploaded Image:</Typography>
          {/* <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} /> */}
        </Box>
      )}

      <div>{imageUrl}</div>
    </Box>
  );
};

export default ImageClassify;
