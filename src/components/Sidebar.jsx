import { Box, Typography, Button } from "@mui/material";
import newChatIcon from "../assets/newchat.png";
import editIcon from "../assets/edit.png";

export default function Sidebar({ onNewChat }) {
  return (

    <Box
      sx={{
        width: 260,
        background: "#efe9ff",
        height: "100vh",
        p: 2
      }}
    >

      <Box
        onClick={onNewChat}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background: "#dcd2ff",
          p: 1.5,
          borderRadius: 2,
          cursor: "pointer"
        }}
      >

        <img src={newChatIcon} alt="new chat" width={28} />

        <Typography fontWeight={700}>New Chat</Typography>

        <Box flexGrow={1} />

        <img src={editIcon} alt="edit" width={18} />
      </Box>

      <Button
        fullWidth

        sx={{
          mt: 3,
          background: "#dcd2ff",
          color: "#000",
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600
        }}
      >
        Past Conversations
        
      </Button>
    </Box>
  );
}
