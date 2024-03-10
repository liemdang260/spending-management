import { Typography } from "@mui/material";
import React from "react";

function Logo() {
  return (
    <div className="flex flex-row items-center p-2 justify-between">
      <img alt="logo" src={"logo.svg"} className="w-12 h-12"></img>
      <Typography
        className="text-white font-dancingScript !text-[22px]"
        variant="h5"
        component="h6"
      >
        Quản Lý Chi Tiêu
      </Typography>
    </div>
  );
}

export default Logo;
