import hinhHeoDat from "../../assets/hinhheodat.jpg";
import { Paper } from "@mui/material";
import { Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function LoginPage() {
  useAuth();
  return (
    <Grid2 container className="w-[100vw] h-[100vh]">
      <Grid2 xs={8}>
        <img src={hinhHeoDat} className="h-full" alt="hinh-heo-dat" />
      </Grid2>
      <Grid2 xs={4}>
        <div className="flex-grow h-full relative">
          <Paper
            elevation={5}
            className="w-[80%] h-[80%] bg-black absolute top-[10%] right-[25%] "
          >
            <Outlet />
          </Paper>
        </div>
      </Grid2>
    </Grid2>
  );
}

export default LoginPage;
