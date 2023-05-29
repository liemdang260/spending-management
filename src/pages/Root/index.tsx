import React from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Outlet } from "react-router"
import SideBar from "../../components/SideBar"

function Root() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid2 container sx={{ height: "100%" }}>
        <Grid2 xs={2}>
          <SideBar />
        </Grid2>
        <Grid2 xs={10}>
          <Outlet />
        </Grid2>
      </Grid2>
    </div>
  )
}

export default Root
