import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });
  const [backendMessage, setBackendMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
   
try {
    const response = await axios.post("http://localhost:8080/register", form);
    alert(response.data.status)
    navigate("/login");
  } catch (error) {
    setBackendMessage(
      error.response?.data?.message || "Registration failed. Try again."
    );
  }
};

  return (
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 8,
            p: 4,
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>

          {backendMessage && (
            <Alert
              severity={
                typeof backendMessage === "string" &&
                backendMessage.toLowerCase().includes("success")
                  ? "success"
                  : "error"
              }
              sx={{ mb: 2 }}
            >
              {backendMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="mobileNumber"
              label="Mobile Number"
              type="tel"
              value={form.mobileNumber}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
           

            <Button variant="contained" type="submit" fullWidth>
              Register
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

  );
};

export default Register;
