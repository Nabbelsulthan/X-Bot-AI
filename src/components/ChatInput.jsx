import { Box, Button, Avatar } from "@mui/material";
import { useState } from "react";
import bot from "../assets/bot.png";

export default function ChatInput({ onAsk, onSave }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim()) return;
        onAsk(text);
        setText("");
    };

    return (
        <Box
            component="form"
            role="form" 
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: "#f6f3ff",
                borderRadius: "16px",
                p: 1.5,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
            }}
        >
            {/* BOT AVATAR */}
            <Avatar
                src={bot}
                sx={{
                    width: 44,
                    height: 44
                }}
            />

            {/* INPUT */}
            <input
              name="chat-input"
                placeholder="Message Bot AI..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />

            {/* ASK */}
            <Button
                type="submit"
                sx={{
                    px: 3,
                    height: 44,
                    borderRadius: "12px",
                    background: "#d6cbff",
                    color: "#000",
                    fontWeight: 600,
                    "&:hover": { background: "#c8bbff" }
                }}
            >
                Ask
            </Button>

            {/* SAVE */}
            <Button
                type="button"
                onClick={onSave}
                sx={{
                    px: 3,
                    height: 44,
                    borderRadius: "12px",
                    background: "#e4dbff",
                    color: "#000",
                    fontWeight: 600
                }}
            >
                Save
            </Button>
        </Box>
    );
}
