import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UsersContext } from "../context/userContext";
import Link from "@mui/material/Link";
import { Navigate } from "react-router-dom";

function ResponsiveAppBar() {
  const { user } = useContext(UsersContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <img
            src="https://i.hizliresim.com/kti4lvy.png"
            height="60"
            width="60"
            alt="logo"
          />
          <Typography
            variant="h8"
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#1d3557",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Link
              href={user !== "null" ? "/profile" : "/"}
              color="#1d3557"
              underline="none"
            >
              GAMERECAP
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {user !== "null" ? (
              <>
                <Button
                  color="inherit"
                  href={user.role === "admin" ? "/chats" : "/support"}
                >
                  Support
                </Button>
                <Button
                  color="inherit"
                  href="/login"
                  onClick={() => {
                    localStorage.setItem("user", null);
                  }}
                >
                  LogOut
                </Button>
              </>
            ) : (
              <Button color="inherit" href="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;
