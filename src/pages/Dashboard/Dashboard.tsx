import { Grid } from "@mui/material";
import React from "react";
import PieChart from "../../components/PieChart";
import StackedBarChart from "../../components/StackedBarChart";
import Information from "./Information";
import JarsContainer from "./JarsContainer";
import { IJar } from "../../interfaces/spending.interfaces";

export type DashboardProps = {
  information: {
    income: number;
    outcome: number;
  };
  jars: IJar[];
};

function Dashboard({ jars, information }: DashboardProps) {
  return (
    <div className="w-full h-full px-6 py-6 bg-gray-100">
      <Grid container className="h-full" spacing={2}>
        <Grid item xs={6} container spacing={2} rowSpacing={1}>
          <Information {...information} />
          <StackedBarChart />
          <PieChart />
        </Grid>
        <Grid item xs={6}>
          <JarsContainer jars={jars} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
