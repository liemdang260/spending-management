import { Grid, Paper } from "@mui/material";
import React from "react";
import Jar from "../../components/Jar";
import { IJar } from "../../services/Models/JarModel";

export type JarsContainerProps = {
  jars: IJar[];
};
function JarsContainer({ jars }: JarsContainerProps) {
  return (
    <Paper className="w[40%] flex flex-wrap justify-center h-full p-3">
      <Grid container spacing={1}>
        {jars.slice(0, 8).map((jar, index) => (
          <Grid item xs={4} key={`jar-${index}`}>
            <Paper className="h-[90%]">
              <Jar jar={jar} />
            </Paper>
          </Grid>
        ))}

        <Grid item xs={4}>
          <Paper className="h-[90%]">
            <Jar create />
          </Paper>
        </Grid>
        {/* {Array(9 - jars.length - 1).map(() => (
          <Grid item xs={4}>
            <Paper elevation={24} className="inline-block w-full h-full">
              <Container>tao moi</Container>
            </Paper>
          </Grid>
        ))} */}
      </Grid>
    </Paper>
  );
}

export default JarsContainer;
