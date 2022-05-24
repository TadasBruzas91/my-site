import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import ChartComponent from "./components/ChartComponent";
import "./App.css";

const baseUrl = process.env.REACT_APP_API_URL || "http://192.168.1.90:3001";

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: current } = await axios.get(`${baseUrl}/hwinfo/current`);
        const { data: history } = await axios.get(`${baseUrl}/hwinfo/history`);
        const [currentData] = current;
        if (current) setCurrentData(currentData.currentData);
        if (history) setHistoryData(history);
      } catch (ex) {
        console.error(ex);
      }
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
        {currentData?.length > 0 ? (
          currentData.map((item) => (
            <Grid item xs={12} container spacing={1} key={item?._id}>
              {" "}
              <Grid item xs={12} md={3} textAlign="center">
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
              <Grid item xs={12} md={9}>
                <Paper sx={{ height: 203 }}>
                  <ChartComponent data={historyData} item={item} />
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
