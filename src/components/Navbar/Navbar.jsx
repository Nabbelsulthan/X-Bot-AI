import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import person from "../../assets/person.png";

export default function Navbar({ onMenuClick, isDesktop }) {
  return (

    <AppBar position="fixed" elevation={0} color="transparent">

      <Toolbar>
        {!isDesktop && (
          <IconButton edge="start" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600, color: "#9b7edc" }}
        >
          Bot AI
        </Typography>

        <Avatar src={person} />
        
      </Toolbar>
    </AppBar>
  );
}
