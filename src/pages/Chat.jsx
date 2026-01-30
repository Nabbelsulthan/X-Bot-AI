import { useState, useRef, useEffect } from "react";

import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Snackbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ChatMessage from "../components/ChatMessage";
import FeedbackModal from "../components/FeedbackModal";
import bot from "../assets/bot.png";
import data from "../data/sampleData.json";


const getTime = () =>
    new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [openFeedback, setOpenFeedback] = useState(false);
    const [openToast, setOpenToast] = useState(false);

    const navigate = useNavigate();

    const scrollRef = useRef(null);


    useEffect(() => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);




    /*  ASK QUESTION  */
    const handleAsk = (question) => {
        if (!question.trim()) return;

        const normalized = question.trim().toLowerCase();

        const match = data.find(
            (d) => d.question.toLowerCase().trim() === normalized
        );

        setMessages((prev) => [
            ...prev,
            {
                sender: "you",
                text: question,
                time: getTime()
            },
            {
                sender: "ai",
                text: match?.response || "Sorry, Did not understand your query!",
                time: getTime()
            }
        ]);

        setInput("");
    };

    /*  SAVE CHAT  */
    const handleSaveChat = () => {
        if (messages.length === 0) return;

        const history =
            JSON.parse(localStorage.getItem("chat_history")) || [];

        const newChat = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            messages
        };

        localStorage.setItem(
            "chat_history",
            JSON.stringify([newChat, ...history])
        );

        setMessages([]);       // reset to landing page
        setOpenToast(true);   //  SHOW TOAST
    };



    /*  SAVE FEEDBACK   */
    const submitFeedback = (feedbackText) => {
        setMessages((prev) => {
            const updated = [...prev];
            for (let i = updated.length - 1; i >= 0; i--) {
                if (updated[i].sender === "ai") {
                    updated[i] = {
                        ...updated[i],
                        feedback: feedbackText
                    };
                    break;
                }
            }
            return updated;
        });

        setOpenFeedback(false);
    };

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(180deg,#f4f1ff,#d8ccff)"
            }}
        >
            {/*  CHAT BODY  */}
            <Box
                ref={scrollRef}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 4,
                    pt: 4,
                    pb: 2
                }}
            >
                {messages.length === 0 ? (
                    <>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            textAlign="center"
                            mt={6}
                        >
                            How Can I Help You Today?
                        </Typography>

                        <Box textAlign="center" my={4}>
                            <img src={bot} alt="bot" width={70} />
                        </Box>

                        <Box
                            sx={{
                                maxWidth: 900,
                                mx: "auto",
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                gap: 2
                            }}
                        >
                            {data.slice(0, 4).map((d, i) => (
                                <Card
                                    key={i}
                                    onClick={() => handleAsk(d.question)}
                                    sx={{
                                        cursor: "pointer",
                                        boxShadow: "0px 4px 12px rgba(0,0,0,0.12)"
                                    }}
                                >
                                    <CardContent>
                                        <Typography fontWeight={600}>
                                            {d.question}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Get immediate AI generated response
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </>
                ) : (
                    <Box sx={{ maxWidth: 900, mx: "auto", pt: 6 }}>
                        {messages.map((m, i) => (
                            <ChatMessage
                                key={i}
                                msg={m}
                                onFeedback={() => setOpenFeedback(true)}
                                onRate={(rating) => {
                                    setMessages((prev) => {
                                        const updated = [...prev];
                                        updated[i] = {
                                            ...updated[i],
                                            rating
                                        };
                                        return updated;
                                    });
                                }}
                            />

                        ))}

                        {/* <div ref={bottomRef} /> */}
                    </Box>
                )}
            </Box>

            {/*  INPUT  */}
            <Box
                sx={{
                    px: 4,
                    py: 2,
                    background: "#f6f3ff",
                    borderTop: "1px solid #ddd"
                }}
            >
                <Box
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        display: "flex",
                        gap: 2
                    }}
                >
                    <input
                        placeholder="Message Bot AI..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "16px"
                        }}
                    />


                    <Button
                        onClick={() => handleAsk(input)}
                        sx={{
                            background: "#d6cbff",
                            color: "#000",
                            fontWeight: 600,
                            "&:hover": { background: "#c8bbff" }
                        }}

                    >
                        Ask
                    </Button>

                    <Button
                        onClick={handleSaveChat}
                        sx={{
                            background: "#e8e2ff",
                            color: "#000",
                            fontWeight: 600,
                            "&:hover": { background: "#dccfff" }
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>

            {/*  FEEDBACK MODAL  */}
            <FeedbackModal
                open={openFeedback}
                onClose={() => setOpenFeedback(false)}
                onSubmit={submitFeedback}
            />

            {/*  SAVE TOAST  */}
            <Snackbar
                open={openToast}
                autoHideDuration={4000}
                onClose={() => setOpenToast(false)}
                message={
                    <span>
                        Chat saved.&nbsp;
                        <Button
                            size="small"
                            onClick={() => navigate("/history")}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            See past conversations
                        </Button>
                    </span>
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            />
        </Box>
    );
}