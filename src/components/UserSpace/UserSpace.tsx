import { Button } from "@mui/material";
import React from "react";
export type UserSpaceProps = {
  onLogout: () => void;
};

function UserSpace({ onLogout }: UserSpaceProps) {
  return (
    <div className="bg-white">
      <Button onClick={onLogout}>Log out</Button>
    </div>
  );
}

export default UserSpace;
