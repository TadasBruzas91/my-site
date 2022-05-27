import React, { useMemo, useRef, useEffect, useState } from "react";
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

export default function ChartComponent({ data, item }) {
  const chartDivRef = useRef();
  const chartRef = useRef();
  const [dataset, setDataset] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const worker = new Worker(new URL("./processData.js", import.meta.url));
    worker.postMessage({ data, item });
    worker.onmessage = (msg) => {
      const { d, l } = msg.data;
      setDataset(d);
      setLabels(l);
      worker.terminate();
    };
  }, [data]);

  // const dataset = [];
  // const labels = [];

  const chartData = {
    labels,
    datasets: [
      {
        label: `${item.label} in (${item.symbol})`,
        data: dataset,
        borderColor: "#8884D8",
        backgroundColor: "#8884D8",
        tension: 0.5,
      },
    ],
  };

  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          labels: { boxWidth: 0 },
        },
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
