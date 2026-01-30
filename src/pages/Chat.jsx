import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions
} from "@mui/material";

import bot from "../assets/bot.png";
import person from "../assets/person.png";
import data from "../data/sampleData.json";
import ChatInput from "../components/ChatInput";

const normalize = (str) =>

  str.toLowerCase().replace(/[^\w\s]/gi, "").trim();

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

export default function Chat() {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [openFeedback, setOpenFeedback] = useState(false);

  const handleAsk = (question) => {
    if (!question.trim()) return;

    const match = data.find(
      (d) => normalize(d.question) === normalize(question)
    );

    setMessages((prev) => [
      ...prev,
      {
        sender: "you",
        text: question,
        time: getCurrentTime()
      },
      {
        sender: "ai",
        text: match
          ? match.response
          : "Sorry, Did not understand your query!",
        time: getCurrentTime()
      }
    ]);

    setInput("");
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
      {/* CHAT BODY */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 4 }}>
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
              {data.slice(0, 4).map((d) => (
                <Card
                  key={d.id}
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
          <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 3 }}>

                <Avatar src={m.sender === "ai" ? bot : person} />

                <Box
                  sx={{
                    flex: 1,
                    background:
                      "linear-gradient(180deg,#e6dcff,#d2c4ff)",
                    borderRadius: 4,
                    p: 2.5
                  }}
                >
                  <Typography fontWeight={700}>
                    {m.sender === "ai" ? (
                      <span>Soul AI</span>
                    ) : (
                      "You"
                    )}
                  </Typography>

                  <Typography component="p">{m.text}</Typography>

                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {m.time}
                  </Typography>

                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

{/* input  */}
<Box
  sx={{
    px: 3,
    py: 2,
    background: "#f4f1ff"
  }}
>
  <Box sx={{ maxWidth: 900, mx: "auto" }}>
    <ChatInput

      onAsk={handleAsk}

      onSave={() => setOpenFeedback(true)}
    />
  </Box>
</Box>


      {/* FEEDBACK MODAL */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)}>

        <DialogContent>

          <Typography fontWeight={600}>
            Provide Additional Feedback
          </Typography>

          <TextField fullWidth multiline rows={4} />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Submit</Button>
        </DialogActions>
        
      </Dialog>
    </Box>
  );
}
