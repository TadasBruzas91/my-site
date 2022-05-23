import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import ChartComponent from "./components/ChartComponent";
import "./App.css";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost";

function App() {
  const [hwInfo, setHwInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${baseUrl}/api/hwinfo`);
      if (data) setHwInfo(data);
    }
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      <Grid container spacing={10}>
        {hwInfo.length > 0 ? (
          hwInfo.map((item) => (
            <Grid item xs={12} container spacing={1} key={item?.id}>
              {" "}
              {/* TODO: Chart not resize properly */}
              <Grid item xs={12} md={"auto"} textAlign="center">
                <CircularProgressWithLabel
                  size={200}
                  thickness={4}
                  value={item?.current}
                  symbol={item?.symbol}
                  label={item?.label}
                  min={item?.min}
                  max={item?.max}
                  mx="auto"
                />
              </Grid>
              <Grid item xs={12} md>
                <Paper sx={{ height: 203 }}>
                  <ChartComponent item={item} />
                </Paper>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid item>
            <h2>Loading...</h2>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
