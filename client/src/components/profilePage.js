import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./appbarGame";
import Divider from "@mui/material/Divider/Divider";
import { Avatar, Chip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import FaceIcon from "@mui/icons-material/Face";

import EmailIcon from "@mui/icons-material/Email";
const theme = createTheme({
  palette: {
    primary: {
      main: "#D3EDEE",
    },
    secondary: {
      main: "#a8dadc",
    },
    third: {
      main: "#457b9d",
    },
    fourth: {
      main: "#508991",
    },
    fifth: {
      main: "#a8dadc",
    },
    sixth: {
      main: "#ffb703",
    },
  },
});

export const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  console.log(user);

  function onPlaylist() {
    navigate(`/playlists/${user.user_id}`);
  }
  function onDiscover() {
    navigate(`/discover`);
  }

  function onGames() {
    navigate(`/games`);
  }
  return user !== null ? (
    <ThemeProvider theme={theme}>
      <div>
        <main>
          <ResponsiveAppBar />
          <Box
            sx={{
              bgcolor: "#f1faee",
              pt: 5,
              pb: 6,
            }}
          >
            <center>
              <Avatar
                src="https://i.hizliresim.com/kti4lvy.png"
                sx={{ width: 150, height: 150 }}
              />
            </center>
            <Box m={1} pt={0}>
              {" "}
            </Box>
            <Container maxWidth="sm">
              <Typography
                variant="h3"
                font
                fontWeight="600"
                align="center"
                color="#457b9d"
              >
                @{user.username}
              </Typography>
              <Box m={1} pt={0}>
                {" "}
              </Box>
              <center>
                <Chip
                  color="secondary"
                  label="Gamer"
                  deleteIcon={<DoneIcon />}
                  icon={<FaceIcon />}
                />
              </center>
              <Box m={1} pt={0}>
                {" "}
              </Box>
              <center>
                <Chip
                  color="secondary"
                  label={user.email}
                  deleteIcon={<DoneIcon />}
                  icon={<EmailIcon />}
                />
              </center>
              <Box m={4} pt={0}>
                {" "}
              </Box>
              <Typography variant="h6" align="center" color="#1d3557" paragraph>
                Welcome to GameRecap {user.username}, The ultimate platform for
                game enthusiasts! As a member of our community, you'll be able
                to rate and review games, create and share lists. You can reach
                anywhere you want from the buttons below to explore the
                wonderful game world.
              </Typography>
              <Stack
                sx={{ pt: 3 }}
                direction="row"
                spacing={1}
                justifyContent="center"
              >
                <Button onClick={onPlaylist} color="error" variant="contained">
                  Playlists
                </Button>
                <Button onClick={onGames} color="sixth" variant="contained">
                  Games
                </Button>
                <Button onClick={onDiscover} color="fourth" variant="contained">
                  Discover
                </Button>
                {user.role === "admin" ? (
                  <Button
                    onClick={() => navigate("/adminpage")}
                    color="primary"
                    variant="contained"
                  >
                    Admin Pages
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/userpage")}
                    color="primary"
                    variant="contained"
                  >
                    User Pages
                  </Button>
                )}
              </Stack>
              <Divider variant="middle" />
            </Container>
            <Box m={0} pt={5}>
              {" "}
            </Box>

            <Container maxWidth="sm">
              <Typography
                variant="h5"
                align="center"
                color="#70798C"
                gutterBottom
              ></Typography>
              <Box m={0} pt={5}>
                {" "}
              </Box>
            </Container>
          </Box>
        </main>
      </div>
    </ThemeProvider>
  ) : null;
};

export default UserProfile;
