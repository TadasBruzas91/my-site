import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
import "./App.css";

function App() {
  const [hwInfo, setHwInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost/api/hwinfo");
      setHwInfo(data);
    }
    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <h2>Cpu load</h2>
      <CircularProgressWithLabel
        size={200}
        thickness={4}
        color="success"
        value={hwInfo.cpu_load}
        symbol="%"
      />
      <h2>Cpu ferquency</h2>
      <CircularProgressWithLabel
        size={200}
        thickness={4}
        color="success"
        value={hwInfo.cpu_freq}
        min={hwInfo.cpu_freq_min}
        max={hwInfo.cpu_freq_max}
        symbol="GHz"
      />
      <h2>Cpu Temperatue</h2>
      <CircularProgressWithLabel
        size={200}
        thickness={4}
        color="success"
        value={hwInfo.cpu_temp}
        min={30}
        max={90}
        symbol="°C"
      />
      <h2>Ram used</h2>
      <CircularProgressWithLabel
        size={200}
        thickness={4}
        color="success"
        value={hwInfo.ram_used_perc}
        symbol="%"
      />
    </div>
  );
}

export default App;
