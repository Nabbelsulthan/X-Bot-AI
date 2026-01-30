import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleNewChat = () => {
    setResetKey((k) => k + 1);

    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden"
      }}
    >
      {/* DESKTOP SIDEBAR */}
      {!isMobile && <Sidebar onNewChat={handleNewChat} />}

      {/* MOBILE SIDEBAR */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Sidebar onNewChat={handleNewChat} />

        </Drawer>
      )}

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0   
        }}
      >
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <Box
          key={resetKey}
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden"
          }}
        >
          {children}
          
        </Box>
      </Box>
    </Box>
  );
}
