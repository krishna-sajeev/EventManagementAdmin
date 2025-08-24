import React, { useState } from "react";
import { Sheet } from "@mui/joy";
import { Button, FormControl, FormLabel, Input, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const validateUser = async () => {
    try {
      const res = await axios.post("http://localhost:8080/login", user);

      if (res.data.token) {
        alert("Login successful ");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.Id);
        localStorage.setItem("userName", res.data.user.fullName);

        navigate("/view"); 
      } else {
        alert(res.data.status || "Invalid credentials");
        setUser({ email: "", password: "" });
      }
    } catch (err) {
      alert("Login error " + err.message);
    }
  };

  return (
    <main>
      <Sheet
        sx={{
          width: 300,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography variant="body2">Sign in to continue.</Typography>
        </div>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            value={user.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button sx={{ mt: 1 }} onClick={validateUser}>
          Log in
        </Button>

        <Typography sx={{ fontSize: "sm", alignSelf: "center" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#1976D2", textDecoration: "none" }}>
            Register here
          </Link>
        </Typography>
      </Sheet>
    </main>
  );
};

export default Login;
