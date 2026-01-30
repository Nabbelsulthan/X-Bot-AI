import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import bot from "../assets/bot.png";
import person from "../assets/person.png";

export default function ChatMessage({ msg }) {
  const isAI = msg.sender === "ai";

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

      <Avatar src={isAI ? bot : person} />

      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(180deg,#e6dcff,#d2c4ff)",
          p: 2.5,
          borderRadius: 4,
          position: "relative",
          "&:hover .actions": { opacity: 1 }
        }}
      >
        <Typography fontWeight={700}>

          {isAI ? <span>Soul AI</span> : "You"}

        </Typography>

        <Typography component="p">{msg.text}</Typography>

        <Typography variant="caption" sx={{ opacity: 0.6 }}>

          {msg.time}

        </Typography>

        {isAI && (
          <Box className="actions" sx={{ opacity: 0 }}>

            <IconButton size="small"><ThumbUpOffAltIcon /></IconButton>
            
            <IconButton size="small"><ThumbDownOffAltIcon /></IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
