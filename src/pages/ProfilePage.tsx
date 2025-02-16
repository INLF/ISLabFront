import React, { useEffect, useState } from "react";
import { Typography, Paper, Grid, CircularProgress, Box } from "@mui/material";
import { getMe } from "./../services/userService";
import { User } from "./../types/userTypes";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" style={{ marginTop: "20px" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Profile
          </Typography>
          {user && (
            <Box>
              <Typography variant="h6">Name: {user.name}</Typography>
              <Typography variant="h6">Login: {user.login}</Typography>
              <Typography variant="h6">Role: {user.role}</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
