import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Select,
  MenuItem
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import bot from "../assets/bot.png";
import person from "../assets/person.png";

/* ---------- DATE HELPERS ---------- */
const isToday = (iso) => {
  if (!iso) return false;
  const d = new Date(iso);
  if (isNaN(d)) return false;

  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

const formatDate = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;

  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export default function History() {
  const [filter, setFilter] = useState("all");

 const history = useMemo(() => {
  try {
    return JSON.parse(localStorage.getItem("chat_history")) || [];
  } catch {
    return [];
  }
}, []);


  /* ---------- GROUP + FILTER (CHAT LEVEL) ---------- */
  const grouped = useMemo(() => {
    const groups = {};

    history.forEach((chat) => {
      if (!chat?.createdAt || !Array.isArray(chat.messages)) return;

      // ✅ Check if chat matches rating filter
      const matchesRating =
        filter === "all" ||
        chat.messages.some(
          (m) =>
            m.sender === "ai" &&
            typeof m.rating === "number" &&
            m.rating === Number(filter)
        );

      if (!matchesRating) return;

      const label = isToday(chat.createdAt)
        ? "Today's chats"
        : formatDate(chat.createdAt);

      if (!label) return;

      if (!groups[label]) groups[label] = [];
      groups[label].push(...chat.messages); // ✅ PUSH ALL MESSAGES
    });

    return groups;
  }, [history, filter]);

  const hasResults = Object.values(grouped).some(
    (msgs) => msgs.length > 0
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 4,
        py: 3
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700} mb={2}>
        Conversation History
      </Typography>

      {/* FILTER */}
      <Box sx={{ mb: 3, maxWidth: 220 }}>
        <Typography variant="caption" fontWeight={600}>
          Filter by rating
        </Typography>

        <Select
          fullWidth
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All Ratings</MenuItem>
          <MenuItem value="1">1 Star</MenuItem>
          <MenuItem value="2">2 Stars</MenuItem>
          <MenuItem value="3">3 Stars</MenuItem>
          <MenuItem value="4">4 Stars</MenuItem>
          <MenuItem value="5">5 Stars</MenuItem>
        </Select>
      </Box>

      {/* SCROLLABLE CONTENT */}
      <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
        {!hasResults && history.length > 0 && (
          <Typography color="text.secondary">
            No conversations found for the selected rating.
          </Typography>
        )}

        {hasResults &&
          Object.entries(grouped).map(([date, messages]) => (
            <Box key={date} mb={4}>
              <Typography fontWeight={700} mb={2}>
                {date}
              </Typography>

              {messages.map((m, i) => (
                <Card
                  key={i}
                  sx={{
                    p: 2,
                    mb: 2,
                    display: "flex",
                    gap: 2,
                    background: "#e6dcff",
                    borderRadius: 2
                  }}
                >
                  <Avatar
                    src={m.sender === "ai" ? bot : person}
                    sx={{ width: 42, height: 42 }}
                  />

                  <Box>
                    <Typography fontWeight={700}>
                      {m.sender === "ai" ? "Soul AI" : "You"}
                    </Typography>

                    <Typography>{m.text}</Typography>

                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.6 }}
                    >
                      {m.time}
                    </Typography>

                    {/* RATING (AI ONLY) */}
                    {m.sender === "ai" &&
                      typeof m.rating === "number" && (
                        <Box sx={{ display: "flex", mt: 0.5 }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon
                              key={s}
                              fontSize="small"
                              sx={{
                                color:
                                  s <= m.rating ? "#f5b301" : "#ccc"
                              }}
                            />
                          ))}
                        </Box>
                      )}

                    {/* FEEDBACK */}
                    {m.feedback && (
                      <Typography variant="caption">
                        <strong>Feedback:</strong> {m.feedback}
                      </Typography>
                    )}
                  </Box>
                </Card>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
