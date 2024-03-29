import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameFinder from "../../apis/GameFinder";
import ResponsiveAppBar from "../appbarGame";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a8dadc",
    },
    secondary: {
      main: "#e63946",
    },
  },
});

const UpdateGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await GameFinder.get(`/games/${id}`);
      setName(response.data.data.game.game_name);
      setDate(response.data.data.game.release_date);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await GameFinder.patch(`/games/${id}`, {
      game_name: name,
      release_date: date,
    }).then(() => {
      navigate("/games");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://i.hizliresim.com/kti4lvy.png"
            height="100"
            width="100"
            alt="logo"
          />
          <Box m={1} pt={0}>
            {" "}
          </Box>
          <Typography variant="h4" component="h1" gutterBottom color="#f1faee">
            Update Game
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="form-control"
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              className="form-control"
              type="date"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateGame;
