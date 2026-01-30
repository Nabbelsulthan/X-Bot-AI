import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import newChatIcon from "../assets/newchat.png";
import editIcon from "../assets/edit.png";

export default function Sidebar({ onNewChat }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNewChat = () => {
        // reset chat state
        onNewChat?.();

        // if not already on chat page, go there
        if (location.pathname !== "/") {
            navigate("/");
        }
    };

    const handleHistory = () => {
        navigate("/history");
    };

    return (
        <Box
            sx={{
                width: 260,
                background: "#efe9ff",
                height: "100vh",
                p: 2
            }}
        >
            {/* NEW CHAT */}
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Box
                    onClick={handleNewChat}
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
            </a>


            {/* PAST CONVERSATIONS */}
            <a href="/history" style={{ textDecoration: "none", width: "100%" }}>
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
            </a>

        </Box>
    );
}
