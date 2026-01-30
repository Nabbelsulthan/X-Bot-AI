import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Select,
  MenuItem
} from "@mui/material";

import bot from "../assets/bot.png";
import person from "../assets/person.png";

/* ---------- DATE HELPERS ---------- */
const isToday = (iso) => {
  const d = new Date(iso);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

export default function History() {
  const [filter, setFilter] = useState("all");

  const history =
    JSON.parse(localStorage.getItem("chat_history")) || [];

  /* ---------- GROUP BY DATE ---------- */
  const groupedChats = useMemo(() => {
    const groups = {};

    history.forEach((chat) => {
      const key = isToday(chat.createdAt)
        ? "today"
        : formatDate(chat.createdAt);

      if (!groups[key]) groups[key] = [];
      groups[key].push(chat);
    });

    return groups;
  }, [history]);

  /* ---------- FILTER LOGIC ---------- */
  const filterMessages = (messages) => {
    if (filter === "all") return messages;

    return messages.filter(
      (m) =>
        m.sender === "ai" &&
        m.rating === Number(filter)
    );
  };

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
      <Box sx={{ mb: 3, maxWidth: 200 }}>
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
        {Object.keys(groupedChats).length === 0 && (
          <Typography>No saved conversations</Typography>
        )}

        {Object.entries(groupedChats).map(([date, chats]) => (
          <Box key={date} mb={4}>
            {/* DATE HEADER */}
            <Typography variant="subtitle1" fontWeight={700} mb={2}>
              {date === "today" ? "Today's chats" : date}
            </Typography>

            {chats.map((chat) => {
              const filtered = filterMessages(chat.messages);
              if (filtered.length === 0) return null;

              return filtered.map((m, i) => (
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
                  </Box>
                </Card>
              ));
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
