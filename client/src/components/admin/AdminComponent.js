import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "../appbarGame";
import React, { useEffect, useContext, useState } from "react";
import GameFinder from "../../apis/GameFinder";
import { GameContext } from "../../context/gameContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddNewGameComponent from "../game/AddNewGame";
import { colors } from "@mui/material";
import { UsersContext } from "../../context/userContext";

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
      main: "#457b9d",
      sec: "#D3EDEE",
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

export default function AdminPage(props) {
  const { user } = useContext(UsersContext);
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
      <ResponsiveAppBar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "#f1faee",
            pt: 8,
            pb: 6,
          }}
        >
          <center>
            {user.role === "admin" ? (
              <Typography
                component="h1"
                variant="h4"
                color="#457b9d"
                fontWeight="600"
              >
                Management
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h4"
                color="#457b9d"
                fontWeight="600"
              >
                Pages
              </Typography>
            )}
          </center>
          <Stack
            sx={{ pt: 3 }}
            direction="row"
            spacing={1}
            justifyContent="center"
          >
            <Button
              onClick={() => navigate("/games")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Games
            </Button>
            <Button
              onClick={() => navigate("/categorypage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Categories
            </Button>
            <Button
              onClick={() => navigate("/developmentstudiopage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Development Studios
            </Button>
            <Button
              onClick={() => navigate("/publishingstudiospage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Publishing Studios
            </Button>
            <Button
              onClick={() => navigate("/playlists")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Playlists
            </Button>
            <Button
              onClick={() => navigate("/dlcpage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              DLC
            </Button>
            <Button
              onClick={() => navigate("/languagepage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Languages
            </Button>
            <Button
              onClick={() => navigate("/onlinestorepage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Online Stores
            </Button>
            <Button
              onClick={() => navigate("/platformpage")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Platforms
            </Button>
            <Button
              onClick={() => navigate("/subservice")}
              sx={{
                color: "#f1faee",
                backgroundColor: "#457b9d",
                borderColor: "green",
              }}
              variant="contained"
            >
              Subscription Services
            </Button>
            {user.role === "admin" ? (
              <Button
                onClick={() => navigate("/useradminpage")}
                sx={{
                  color: "#f1faee",
                  backgroundColor: "#457b9d",
                  borderColor: "green",
                }}
                variant="contained"
              >
                Users
              </Button>
            ) : null}
          </Stack>
        </Box>
      </main>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
}
