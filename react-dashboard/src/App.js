import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [hwInfo, setHwInfo] = useState();
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
      <h2>Cpu load {hwInfo ? hwInfo.cpu_load.toFixed(2) : ""}</h2>
      <h2>Cpu Frequency {hwInfo ? hwInfo.cpu_freq.toFixed(2) : ""}</h2>
      <h2>Cpu Temp {hwInfo ? hwInfo.cpu_temp.toFixed(2) : ""}</h2>
      <h2>Ram used {hwInfo ? hwInfo.ram_used_perc.toFixed(2) : ""}</h2>
    </div>
  );
}

export default App;
