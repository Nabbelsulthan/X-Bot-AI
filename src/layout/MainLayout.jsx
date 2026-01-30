import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

const drawerWidth = 260;

export default function MainLayout({ children }) {

  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        onMenuClick={() => setOpen(true)}
        isDesktop={isDesktop}
      />

      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        isDesktop={isDesktop}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: isDesktop ? `${drawerWidth}px` : 0
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
