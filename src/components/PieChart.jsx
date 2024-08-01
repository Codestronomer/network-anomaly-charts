import React from "react";
import { Pie } from "react-chartjs-2";
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

const normalizeData = (data) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  return data.map((value) => (value / total) * 100);
};

const PieChart = ({ data }) => {
  const attackTypeCounts = Object.keys(attackTypes).reduce((acc, key) => {
    acc[key] = data.filter((item) => item.label === Number(key)).length;
    return acc;
  }, {});

  const normalizedCounts = normalizeData(Object.values(attackTypeCounts));

  const chartData = {
    labels: Object.values(attackTypes),
    datasets: [
      {
        label: "Attack Type Distribution",
        data: normalizedCounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "500px", marginBottom: '30px' }}>
      <Pie data={chartData} />
    </div>
  )
};

export default PieChart;