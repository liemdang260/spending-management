import { Grid, Paper } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["2017", "2018", "2019", "2020", "2021", "2022"];

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "React",
      data: [32, 42, 51, 60, 51, 95],
      backgroundColor: "#2196F3",
      borderColor: "#2196F3",
    },
    {
      label: "Angular",
      data: [37, 42, 41, 37, 31, 44],
      backgroundColor: "#F44236",
      borderColor: "#F44236",
    },
    {
      label: "Vue",
      data: [60, 54, 54, 28, 27, 49],
      backgroundColor: "#FFCA29",
      borderColor: "#FFCA29",
    },
  ],
};

function StackedBarChart() {
  return (
    <Grid item xs={12} className="h-[30%]">
      <Paper className="h-full w-full">
        <Bar options={options} data={data} />
      </Paper>
    </Grid>
  );
}

export default StackedBarChart;
