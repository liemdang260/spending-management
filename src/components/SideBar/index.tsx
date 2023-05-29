import React from "react";
import Logo from "../Logo";
import { useTheme } from "@mui/material/styles";
import { Divider, List, ListItem } from "@mui/material";
import menu from "./menu";
import { Link } from "react-router-dom";
import UserSpace from "../UserSpace";

function SideBar() {
  const theme = useTheme();
  return (
    <div
      className="p-3 h-full"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Logo />
      <Divider />
      <List>
        {Object.keys(menu).map((key, index) => (
          <ListItem key={`link-${index}`}>
            <Link
              to={menu[key as keyof typeof menu]}
              className="text-white font-dancingScript text-xl"
            >
              {key}
            </Link>
          </ListItem>
        ))}
      </List>
      <UserSpace />
    </div>
  );
}

export default SideBar;
