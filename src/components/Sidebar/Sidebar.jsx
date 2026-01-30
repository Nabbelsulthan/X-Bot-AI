import {
    Drawer,
    Box,
    Button,
    Typography,
    Divider
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import newChat from "../../assets/newchat.png";

const drawerWidth = 260;

export default function Sidebar({ open, onClose, isDesktop }) {
    return (

        <Drawer
            variant={isDesktop ? "permanent" : "temporary"}

            open={isDesktop || open}

            onClose={onClose}
            sx={{
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    background: "#f3efff",
                    borderRight: "none"
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth

                    startIcon={<img src={newChat} width={20}  />}
                    variant="contained"
                    sx={{
                        background: "#e3dbff",
                        color: "#000",
                        fontWeight: 500,
                        mb: 2,
                        borderRadius: 2
                    }}
                >
                    New Chat
                </Button>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Past Conversations
                </Typography>

                <Button
                    fullWidth
                    startIcon={<EditIcon />}
                    sx={{ justifyContent: "flex-start" }}
                >
                    Conversation 1
                </Button>
            </Box>
        </Drawer>
    );
}
