import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

const TrafficChart = ({ data, metric, label }) => {
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label,
        data: data.map((item) => item[metric]),
        borderColor: data.map((item) => (item.label === 0 ? "green" : "red")),
        backgroundColor: data.map((item) =>
          item.label === 0 ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"
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
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "MMM dd, yyyy HH:mm:ss",
          displayFormats: {
            minute: "MMM dd, yyyy HH:mm",
            second: 'MMM dd, HH:mm:ss',
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
          text: label,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${label}: ${value}`;
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

export default TrafficChart;

// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import "chartjs-adapter-date-fns";

// Chart.register(...registerables);

// const TrafficChart = ({ data }) => {
//   const chartData = {
//     labels: data.map((item) => item.time),
//     datasets: [
//       {
//         label: "Average Packet Size",
//         data: data.map((item) => item.value),
//         borderColor: data.map((item) => (item.label === 0 ? "green" : "red")),
//         backgroundColor: data.map((item) =>
//           item.label === 0 ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"
//         ),
//         fill: false,
//         borderWidth: 1,
//         pointRadius: 3,
//         pointHoverRadius: 5,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           unit: "minute",
//           tooltipFormat: "MMM dd, yyyy HH:mm",
//           displayFormats: {
//             minute: "MMM dd, yyyy HH:mm",
//           },
//         },
//         title: {
//           display: true,
//           text: "Timestamp",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Average Packet Size",
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.dataset.label || "";
//             const value = context.raw;
//             return `${label}: ${value}`;
//           },
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default TrafficChart;
