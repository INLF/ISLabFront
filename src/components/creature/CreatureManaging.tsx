import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  TextField,
} from "@mui/material";
import bookCreatureService from "../../services/creatureService";

const CreatureManaging: React.FC = () => {
  const [attackLevels, setAttackLevels] = useState<number[]>([]);
  const [ringCount, setRingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ringId, setRingId] = useState("");
  const [attackLevel, setAttackLevel] = useState("");

  const fetchAttackLevels = async () => {
    setLoading(true);
    try {
      const uniqueLevels = await bookCreatureService.getUniqueAttackLevels();
      setAttackLevels(uniqueLevels);
    } catch {
      setMessage("Failed to fetch attack levels.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOneByAttackLevel = async () => {
    if (!attackLevel) {
      setMessage("Please enter an attack level.");
      return;
    }
    setLoading(true);
    try {
      await bookCreatureService.removeOneByAttackLevel(Number(attackLevel));
      setMessage(`Creature with attack level ${attackLevel} removed.`);
      fetchAttackLevels();
    } catch {
      setMessage("Error removing creature.");
    } finally {
      setLoading(false);
    }
  };

  const handleCountByRingId = async () => {
    if (!ringId) {
      setMessage("Please enter a ring ID.");
      return;
    }
    setLoading(true);
    try {
      const count = await bookCreatureService.countByRingId(Number(ringId));
      setRingCount(count);
    } catch {
      setMessage("Error getting ring count.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveHobbitRings = async () => {
    setLoading(true);
    try {
      await bookCreatureService.removeHobbitRings();
      setMessage("All hobbit rings removed.");
    } catch {
      setMessage("Error removing hobbit rings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Creature Management
      </Typography>

      <Button variant="contained" onClick={fetchAttackLevels} sx={{ mb: 3 }}>
        Fetch Unique Attack Levels
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {!loading && attackLevels.length > 0 && (
        <Card sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Unique Attack Levels
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {attackLevels.map((lvl, index) => (
                <Chip key={index} label={lvl} color="primary" variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
            label="Ring ID"
            type="number"
            variant="outlined"
            value={ringId}
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                setRingId(value);
                }
            }}
        />
        <Button variant="contained" onClick={handleCountByRingId}>
          Count Creatures with Ring ID
        </Button>

        {ringCount !== null && (
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Creatures with ring ID {ringId}: {ringCount}
          </Typography>
        )}

        <TextField
          label="Attack Level"
          type="number"
          variant="outlined"
          value={attackLevel}
          onChange={(e) => setAttackLevel(e.target.value)}
        />
        <Button variant="contained" color="warning" onClick={handleRemoveOneByAttackLevel}>
          Remove Creature by Attack Level
        </Button>

        <Button variant="contained" color="error" onClick={handleRemoveHobbitRings}>
          Remove All Hobbit Rings
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

export default CreatureManaging;
