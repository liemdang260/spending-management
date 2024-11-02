import { Avatar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
export type UserSpaceProps = {
  onLogout: () => void;
};

function UserSpace({ onLogout }: UserSpaceProps) {
  return (
    <div className="bg-white rounded">
      <Avatar />
      <IconButton onClick={onLogout}>
        <LogoutIcon className="rotate-180" />
      </IconButton>
    </div>
  );
}

export default UserSpace;
