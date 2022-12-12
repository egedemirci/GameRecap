import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useContext, useState } from "react";
import GameFinder from "../apis/GameRecap_API";
import { GameContext } from "../context/gameContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddNewGameComponent from "./AddNewGame";

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
      main: "#e63946",
    },
    fifth: {
      main: "#a8dadc",
    },
  },
});

const myStyle = {
  background: "#D3EDEE",
  height: "100vh",
  fontSize: "24px",
  backgroundSize: "cover",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function GameListComponent() {
  const { games, setGames } = useContext(GameContext);
  const navigate = useNavigate();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameFinder.get("/games");
        setGames(response.data.data.games);
      } catch (err) {}
    };
    fetchData();
  }, [setGames]);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/games/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await GameFinder.delete(`/games/${id}`);
      setGames(
        games.filter((game) => {
          return games.game_id !== id;
        })
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = [];
    if (
      (start_date === " " || start_date === "") &&
      (end_date === " " || end_date === "")
    ) {
      response = await GameFinder.get(`/games`);
    } else {
      response = await GameFinder.post(`/games/date`, {
        start_date: start_date,
        end_date: end_date,
      });
    }
    setGames(response.data.data.games);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h4" component="h1">
              Filter Release Date
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Typography variant="h6" component="h10">
                Start Date
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                id="date"
                className="form-control"
                type="date"
              />
              <Typography variant="h6" component="h10">
                End Date
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
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
                Filter Date
              </Button>
              <Grid container></Grid>
            </Box>
            <Box sx={{ mt: 3 }}></Box>
            <Typography sx={{ mb: 2 }} variant="h4" component="h1">
              Games
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Game Name</StyledTableCell>
                    <StyledTableCell align="right">
                      Release Date
                    </StyledTableCell>
                    <StyledTableCell align="right">Update</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {games.map((game) => (
                    <StyledTableRow key={game.game_id}>
                      <StyledTableCell align="left">
                        <Button>
                          <Link color="#D3EDEE" to={`/games/${game.game_id}`}>
                            {game.game_name}
                          </Link>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {game.release_date}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <button
                          onClick={(e) => handleUpdate(e, game.game_id)}
                          className="btn btn-secondary"
                          backgroundcolor="#00000"
                        >
                          Update
                        </button>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {" "}
                        <button
                          onClick={(e) => handleDelete(e, game.game_id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <Box sx={{ mt: 3 }}></Box>
          <AddNewGameComponent />
        </Box>
      </main>
      <Box sx={{ bgcolor: "#D3EDEE" }} component="footer">
        <Box sx={{ pt: 3 }}>
          <center>
            <img
              src="https://i.hizliresim.com/kti4lvy.png"
              height="100"
              width="100"
            />{" "}
          </center>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          ></Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
