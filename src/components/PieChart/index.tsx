import { Grid, Paper } from "@mui/material";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const options: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "center",
      labels: {
        boxWidth: 10,
        font: {
          size: 16,
        },
        padding: 10,
      },
    },
  },
} as ChartOptions<"pie">;

function PieChart() {
  return (
    <Grid item xs={12} className="h-1/2">
      <Paper className="h-full w-full">
        <Pie data={data} options={options} />
      </Paper>
    </Grid>
  );
}

export default PieChart;
