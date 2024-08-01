import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

const attackTypes = {
  1: "DDOS",
  2: "PortScan",
  3: "Bot",
  4: "Web Attack Brute Force",
  5: "FTP-Patator",
  6: "DoS slowloris",
  0: "BENIGN",
};

const GeneralChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: Object.entries(attackTypes)
          .map(([key, value]) => `${key}: ${value}`)
          .join("; "),
        data: data.map((item) => ({
          x: item.time,
          y: item.label,
          metrics: item,
        })),
        borderColor: data.map((item) =>
          item.label === 0 ? "green" : "red"
        ),
        backgroundColor: data.map((item) =>
          item.label === 0
            ? "rgba(0, 255, 0, 0.3)"
            : "rgba(255, 0, 0, 0.3)"
        ),
        fill: false,
        borderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "MMM dd, yyyy HH:mm",
          displayFormats: {
            minute: "MMM dd, yyyy HH:mm",
            second: "MMM dd, HH:mm:ss"
          },
        },
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: 'Attack Type',
        },
        min: 0,
        max: 6,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const metrics = context.raw.metrics;
            const metricStrings = Object.keys(metrics)
              .filter((key) => key !== "time" && key !== "label")
              .map((key) => `${key}: ${metrics[key]}`);
            return [`Label: ${attackTypes[metrics.label] || metrics.label}`, ...metricStrings];
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};


export default GeneralChart;