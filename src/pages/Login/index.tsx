import hinhHeoDat from "../../assets/hinhheodat.jpg";
import { Paper } from "@mui/material";
import { Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  useAuth();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-row">
      <img src={hinhHeoDat} className="h-full" alt="hinh-heo-dat" />
      <div className="flex-grow h-full relative">
        <Paper
          elevation={5}
          className="w-[80%] h-[80%] bg-black absolute top-[10%] right-[25%] "
        >
          <Outlet />
        </Paper>
      </div>
    </div>
  );
}

export default LoginPage;
