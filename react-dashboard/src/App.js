import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import "./App.css";

function App() {
  const [hwInfo, setHwInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("https://tadascode.lt/api/hwinfo");
      setHwInfo(data);
    }
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  console.log(hwInfo);
  return (
    <Container>
      <Grid container spacing={10}>
        {hwInfo.map((item) => (
          <Grid item xs={12} container spacing={1}>
            <Grid item xs={12} sm={"auto"} textAlign="center">
              <CircularProgressWithLabel
                size={200}
                thickness={4}
                value={item.current}
                symbol={item.symbol}
                label={item.label}
                min={item.min}
                max={item.max}
                mx="auto"
              />
            </Grid>
            <Grid item xs={12} sm>
              <Paper sx={{ height: 203 }}> </Paper>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
