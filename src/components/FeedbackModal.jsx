import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function FeedbackModal({ open, onClose, onSubmit }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {

    onSubmit(feedback);

    setFeedback("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>

        <Typography fontWeight={600}>

          Provide Additional Feedback
        </Typography>

        <IconButton onClick={onClose}>

          <CloseIcon />

        </IconButton>
      </Box>

      <DialogContent>

        <TextField
          multiline
          rows={5}
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}
