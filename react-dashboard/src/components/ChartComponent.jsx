import React, { useMemo, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export default function ChartComponent({ item }) {
  const chartDivRef = useRef();
  const chartRef = useRef();

  const t = new Date();
  const minsInHour = 60;
  const timeZone = t.getTimezoneOffset() / minsInHour;

  // Change time to browser time zone
  const labels = item.labels.reduce((resArray, element, _) => {
    const [hours, minutes, seconds] = element.split(":");
    const correctHours = parseInt(hours) - timeZone;
    const strCorrectHours =
      correctHours < 10 ? `0${correctHours}` : `${correctHours}`;
    const correctTime = `${strCorrectHours}:${minutes}.${seconds}`;
    resArray.push(correctTime);
    return resArray;
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${item.label} in (${item.symbol})`,
        data: item.data,
        borderColor: "#8884D8",
        backgroundColor: "#8884D8",
        tension: 0.5,
      },
    ],
  };

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
            pinch: {
              enabled: true,
            },
          },
          zoom: {
            mode: "x",
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: item.min,
          max: item.max,
        },
        x: {
          grid: {
            display: false,
          },
          min: labels.length - 20,
          max: labels.length,
        },
      },
    };
  }, [item.min, item.max, labels.length]); // TODO: Chart resets when data not full

  // Chart reset when mouse goes out TODO: Chart reset not working on touch screens
  useEffect(() => {
    const resetChart = () => {
      if (chartRef.current) chartRef.current.resetZoom();
    };
    if (chartDivRef && chartDivRef.current) {
      const chartDiv = chartDivRef.current;
      chartDiv.addEventListener("mouseout", resetChart);
      //   chartDivRef.current.addEventListener("touchcancel", resetChart);
      return () => {
        chartDiv.removeEventListener("mouseout", resetChart);
        //   chartDivRef.current.removeEventListener("touchcancel", resetChart);
      };
    }
  }, []);

  return (
    <div ref={chartDivRef} style={{ height: "203px" }}>
      <Line ref={chartRef} options={options} data={chartData} />
    </div>
  );
}
