/** @format */

// start
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", direction: "ltr" }}>
      <CssBaseline />
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar handleDrawerClose={handleDrawerClose} open={open} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
        <Outlet />
      </Box>
    </Box>
  );
}
