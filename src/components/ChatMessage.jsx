import { Box, Avatar, IconButton, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";

import bot from "../assets/bot.png";
import person from "../assets/person.png";

export default function ChatMessage({ msg, onFeedback, onRate }) {
    const isAI = msg.sender === "ai";
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showRating, setShowRating] = useState(false);

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Avatar src={isAI ? bot : person} sx={{ width: 42, height: 42 }} />

            <Box
                sx={{
                    flex: 1,
                    background: "linear-gradient(180deg,#ffffff,#f4f1ff)",
                    borderRadius: 4,
                    p: 3,
                    boxShadow: "0px 4px 14px rgba(0,0,0,0.1)",
                    "&:hover .ai-actions": { opacity: 1 }
                }}
            >
                {/* NAME */}
                <Typography fontWeight={700} mb={1}>
                    {isAI ? "Soul AI" : "You"}
                </Typography>

                {/* MESSAGE */}
                <Typography>{msg.text}</Typography>

                {/* TIME + THUMBS */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {msg.time}
                    </Typography>

                    {isAI && (
                        <Box
                            className="ai-actions"
                            sx={{
                                display: "flex",
                                gap: 0.5,
                                opacity: 0,
                                transition: "0.2s"
                            }}
                        >
                            {/* 👍 THUMBS UP → SHOW RATING */}
                            <IconButton
                                size="small"
                                onClick={() => setShowRating(true)}
                            >
                                <ThumbUpOffAltIcon fontSize="small" />
                            </IconButton>

                            {/* 👎 THUMBS DOWN → FEEDBACK MODAL */}
                            <IconButton size="small" onClick={onFeedback}>
                                <ThumbDownOffAltIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* ⭐ RATE THIS RESPONSE — ONLY AFTER 👍 */}
                {isAI && showRating && (
                    <Box sx={{ mt: 1 }}>
                        <Typography
                            variant="caption"
                            sx={{ fontSize: "12px", color: "#666", mb: 0.3 }}
                        >
                            Rate this response:
                        </Typography>

                        {[1, 2, 3, 4, 5].map((star) => (
                            <IconButton
                                key={star}
                                size="small"
                                sx={{
                                    p: 0.25,
                                    cursor: "pointer"
                                }}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => {
                                    setRating(star);
                                    if (onRate) onRate(star);
                                }}


                            >
                                {star <= (hover || rating) ? (
                                    <StarIcon fontSize="small" sx={{ color: "#f5b301" }} />
                                ) : (
                                    <StarBorderIcon fontSize="small" sx={{ color: "#bbb" }} />
                                )}
                            </IconButton>
                        ))}
                    </Box>
                )}

                {/* FEEDBACK TEXT ONLY */}
                {msg.feedback && (
                    <Typography
                        variant="caption"
                        sx={{ mt: 1.5, display: "block", color: "#333" }}
                    >
                        <strong>Feedback:</strong> {msg.feedback}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
