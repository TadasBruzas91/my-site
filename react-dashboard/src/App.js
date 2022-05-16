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
      const { data } = await axios.get("http://localhost:9000/hwinfo");
      setHwInfo(data);
    }
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  console.log(hwInfo);
  return (
    <Container>
      <Grid container spacing={1} alignItems="center">
        {hwInfo.map((item) => (
          <Grid item sx={12} sm={6}>
            <Paper>
              <CircularProgressWithLabel
                size={200}
                thickness={4}
                value={item.current}
                symbol={item.symbol}
                label={item.label}
                min={item.min}
                max={item.max}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
