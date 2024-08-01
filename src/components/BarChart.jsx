import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const attackTypes = {
  0: "BENIGN",
  1: "DDOS",
  2: "PortScan",
  3: "Bot",
  4: "Web Attack Brute Force",
  5: "FTP-Patator",
  6: "DoS slowloris",
};

const BarChart = ({ data }) => {
  const attackTypeCounts = Object.keys(attackTypes).reduce((acc, key) => {
    acc[key] = data.filter((item) => item.label === Number(key)).length;
    return acc;
  }, {});

  const chartData = {
    labels: Object.values(attackTypes),
    datasets: [
      {
        label: "Attack Type Counts",
        data: attackTypeCounts,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar data={chartData} options={options} />
    </div>
  )
};

export default BarChart;