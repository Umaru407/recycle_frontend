import React from "react";
import Map from "../../Components/Map";
import { Box, Container, Typography } from "@mui/material";
import Search from "../../Components/Search";
// const RecycleContext = React.createContext();
export default function Home() {
  return (
    <Box sx={{ height: "100vh", width: "100%", display: "flex", padding: 0 }}>
      <Box
        sx={{
          flex: 1,
          
          padding: 2,
          maxHeight: "100%",
          
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          flex: 2,
          
          //   padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Map />
      </Box>
    </Box>
    // <Container fixed>
    //   <p style={{ fontSize: 30 }}>111</p>
    //   <Map />
    // </Container>
  );
}
