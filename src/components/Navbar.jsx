import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

export default function Navbar({ onMenuClick }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <header>
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        px: 2,
        background: "#f4f1ff"
      }}
    >
      {isMobile && (
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      )}

      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ ml: isMobile ? 1 : 0, color: "#8b7fd1" }}
      >
        Bot AI
      </Typography>
    </Box>
    </header>
  );
}
