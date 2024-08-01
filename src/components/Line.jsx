import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
);
const LineGraph = ({ options, data }) => {
  return (
    <div>
      LineGraph
      <Line options={options} data={data} />
    </div>
  );
};

export default LineGraph;
