import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { destroyElfCities } from "../../services/cityService";

const CityManaging: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDestroyElfCities = async () => {
    setLoading(true);
    try {
      await destroyElfCities();
      setMessage("All elf cities have been destroyed.");
    } catch {
      setMessage("Error destroying elf cities.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Creature Management
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button variant="contained" color="error" onClick={handleDestroyElfCities}>
          Destroy All Elf Cities
        </Button>
      </Box>

      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
      >
        <Alert severity="info">{message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default CityManaging;
