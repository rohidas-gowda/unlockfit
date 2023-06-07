import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BarChart({ chartData }) {
  const chartLabel = chartData.map(function (val, index) {
    return val.dailydate;
  });

  const barChartData = chartData.map(function (val, index) {
    return val.currentweight;
  });

  const state = {
    labels: chartLabel,
    datasets: [
      {
        label: "Daily Weight",
        backgroundColor: "rgb(255 255 255)",
        borderColor: "rgb(210, 167, 43)",
        borderWidth: 2,
        data: barChartData,
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Daily Weight Tracker",
              fontSize: 20,
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;