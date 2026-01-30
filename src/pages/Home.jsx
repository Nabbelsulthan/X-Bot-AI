import { Box, Typography, Card, CardContent } from "@mui/material";
import bot from "../assets/bot.png";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={2}>
        How Can I Help You Today?
      </Typography>

      <img src={bot} width={80} alt="Bot" />

      <Box sx={{ mt: 4, width: "100%", maxWidth: 500 }}>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography fontWeight={500}>
              Hi, what is the weather
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get immediate AI generated response
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography fontWeight={500}>
              Hi, how are you
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get immediate AI generated response
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
