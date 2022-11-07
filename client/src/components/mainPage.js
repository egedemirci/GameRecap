import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './appbarGame';
import React, { useEffect, useContext } from "react";
import GameFinder from "../apis/GameFinder";
import { GameContext } from "../context/gameContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
      primary: {
        main: '#D3EDEE',
      },
      secondary: {
        main: '#a8dadc',
      },
      third : {
        main : "#457b9d",
      },
      fourth:{
        main: "#e63946",
      },
      fifth :{
        main : "#a8dadc",
      }
    },
  });

  const myStyle={
    background: "#D3EDEE",
    height:'100vh',
    fontSize:'24px',
    backgroundSize: 'cover',
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function MainPage(props) {
    const { games, setGames } = useContext(GameContext);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await GameFinder.get("/");
          console.log(response);
          setGames(response.data.data.games);
        } catch (err) {}
      };
   
      fetchData();
    }, []);

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/games/${id}/update`);
      };

      const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
          const response = await GameFinder.delete(`/${id}`);
          setGames(
            games.filter((game) => {
              return games.game_id !== id;
            })
          );
        } catch (err) {
          console.log(err);
        }
      };
    

  
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Games</StyledTableCell>
            <StyledTableCell align="right">Game ID</StyledTableCell>
            <StyledTableCell align="right">Game Name</StyledTableCell>
            <StyledTableCell align="right">Release Date</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <StyledTableRow key={game.game_id}>
              <StyledTableCell component="th" scope="row">
                {game.game_id}
              </StyledTableCell>
              <StyledTableCell align="right">{game.game_id}</StyledTableCell>
              <StyledTableCell align="right">{game.game_name}</StyledTableCell>
              <StyledTableCell align="right">{game.release_date}</StyledTableCell>
              <StyledTableCell align="right">
              <button
                      onClick={(e) => handleUpdate(e, game.game_id)}
                      className="btn btn-danger"
                    >
                      Update
                    </button>
                </StyledTableCell>
              <StyledTableCell align="right">              <button
                      onClick={(e) => handleDelete(e, game.game_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            <Typography
              variant="h6"
              align="center"
              color="#70798C"
              gutterBottom
            >
                Mail
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
                GameRecap
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button color = 'fourth' variant="contained">UPDATE ACCOUNT</Button>
              <Button color = 'error' variant="contained">DELETE ACCOUNT</Button>
            </Stack>
          </Container>
        </Box>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'primary', p: 6 }} component="footer">
        <center>
      <img src="https://i.hizliresim.com/kti4lvy.png" height="100" width="100"/>    </center>      

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >

        </Typography>

      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}