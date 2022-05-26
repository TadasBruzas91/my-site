import React, { useState, useEffect, useTransition } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import "./App.css";
import ChartComponent from "./components/ChartComponent";

const baseUrl = process.env.REACT_APP_API_URL || "http://192.168.1.90:3001";

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [historyValue, setHistoryValue] = useState(120);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchHistoryData() {
      const { data: history } = await axios.get(`${baseUrl}/hwinfo/history`, {
        params: { hist: historyValue },
      });
      if (history) setHistoryData(history);
    }
    fetchHistoryData();
  }, [historyValue]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: current } = await axios.get(`${baseUrl}/hwinfo/current`);
        const [currentData] = current;
        if (current) setCurrentData(currentData.currentData);
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
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={historyValue}
              onChange={(e, newValue) => setHistoryValue(newValue)}
              variant="scrollable"
              allowScrollButtonsMobile
              scrollButtons="auto"
              aria-label="history buttons"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              <Tab value={8640} label="12h" />
              <Tab value={720} label="1h" />
              <Tab value={120} label="10min" />
            </Tabs>
          </Box>
        </Grid>
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
