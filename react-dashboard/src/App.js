import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import "./App.css";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function App() {
  const [hwInfo, setHwInfo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("https://tadascode.lt/api/hwinfo");
      if (data) setHwInfo(data);
    }
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatNumber = (number) => {
    if (!Number.isInteger(number)) return number.toFixed(1);
    return number;
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Grid container spacing={10}>
        {hwInfo.length > 0 ? (
          hwInfo.map((item) => (
            <Grid item xs={12} container spacing={1} key={item?.id}>
              <Grid item xs={12} sm={"auto"} textAlign="center">
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
              <Grid item xs={12} sm>
                <Paper sx={{ height: 203 }}>
                  <ResponsiveContainer>
                    <LineChart data={item?.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        animationDuration={0.5}
                        dot={false}
                      />
                      <CartesianGrid
                        stroke="#ccc"
                        opacity={0.2}
                        vertical={false}
                      />
                      <XAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => ""}
                      />
                      <YAxis
                        domain={[item?.min, item?.max]}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(number) =>
                          `${formatNumber(number)}${item?.symbol}`
                        }
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
