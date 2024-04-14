import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import { formatMoney } from "../../utils/moneyFormatter";

type InformationProps = {
  income: number;
  outcome: number;
};
function Information({ income, outcome }: InformationProps) {
  return (
    <Grid item xs={12} container className="h-[20%]" spacing={1}>
      <Grid item xs={7}>
        <Paper className="h-full">
          <Container className="w-full h-full overflow-hidden">
            <div className="flex flex-row justify-around items-center w-full h-full">
              <CircularProgressWithLabel
                value={income === 0 ? 100 : ((income - outcome) / income) * 100}
                size={60}
              />
              <div>
                <Typography variant="h5">Số dư khả dụng</Typography>
                <Typography>{formatMoney(income - outcome)}</Typography>
              </div>
            </div>
            <Divider />
            <Typography>Thẻ chi tiêu</Typography>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={5} container spacing={1}>
        <Grid item xs={12}>
          <Paper className="h-full">
            <Container className="w-full h-full">
              <div>
                <Typography>Thu nhập</Typography>
                <Typography>{formatMoney(income)}</Typography>
              </div>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="h-full">
            <Container className="w-full h-full">
              <div>
                <Typography>Chi tiêu</Typography>
                <Typography>{formatMoney(outcome)}</Typography>
              </div>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Information;
