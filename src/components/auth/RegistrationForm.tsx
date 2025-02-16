import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Box, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axiosInstance";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      login: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      login: Yup.string().min(3, "Login must be at least 3 characters").required("Login is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        await api.post("/api/register", values);
        setStatus({ success: "Registration successful! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        console.error("Registration error:", error);
        setStatus({ error: "Registration failed. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Login"
              name="login"
              type="text"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              disabled={formik.isSubmitting}
            >
              Register
            </Button>
          </Box>
          {formik.status && formik.status.error && (
            <Typography color="error" align="center" style={{ marginTop: "20px" }}>
              {formik.status.error}
            </Typography>
          )}
          {formik.status && formik.status.success && (
            <Typography color="primary" align="center" style={{ marginTop: "20px" }}>
              {formik.status.success}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Registration;