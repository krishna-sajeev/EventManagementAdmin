import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const clearUser = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home/login after logout
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "cursive",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Event Management
          </Typography>



          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
 <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/add")}>
            Add
          </Button>
           <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/view")}>
            view
          </Button>
           <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/delete")}>
           delete
          </Button>
           <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/add")}>
            update
          </Button>
          <Button sx={{ color: "#ecf0f1" }} onClick={clearUser}>
            Logout
          </Button>

          <Button sx={{ color: "#ecf0f1" }} onClick={() => navigate("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
