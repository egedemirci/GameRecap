import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { UsersContext } from "../../context/userContext";
import GameFinder from "../../apis/GameFinder";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminPlaylistComponent() {
  const { user } = useContext(UsersContext);
  const [playlists, setPlaylists] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameFinder.get("/playlists");
        setPlaylists(response.data.playlists);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setPlaylists]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await GameFinder.delete(`/playlists/${id}`);
      setPlaylists(
        playlists.filter((playlist) => {
          return playlist.playlist_id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    let response = [];
    if (filter === " " || filter === "") {
      response = await GameFinder.get(`/playlists`);
    } else {
      response = await GameFinder.post(`/playlists/filter`, {
        filter: filter,
      });
    }
    setPlaylists(response.data.playlists);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            height: "100vh",
            pt: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography align="center" variant="h4" component="h1">
              Playlists
            </Typography>
            <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
              Filter By Playlist Name
            </Typography>
            <Box component="form" onSubmit={handleFilter} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                id="date"
                label="Playlist Name"
                className="form-control"
                type="text"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Filter
              </Button>
              <Grid container></Grid>
            </Box>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="h1">
              User Playlists
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Playlist ID</StyledTableCell>
                    <StyledTableCell align="right">
                      Playlist Name
                    </StyledTableCell>
                    {user.role === "admin" ? (
                      <StyledTableCell align="right">Delete</StyledTableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {playlists.map((playlist) => (
                    <StyledTableRow key={playlist.playlist_id}>
                      <StyledTableCell align="right">
                        {playlist.playlist_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {playlist.playlist_name}
                      </StyledTableCell>
                      {user.role === "admin" ? (
                        <StyledTableCell align="right">
                          <button
                            onClick={(e) =>
                              handleDelete(e, playlist.playlist_id)
                            }
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </StyledTableCell>
                      ) : null}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "#D3EDEE" }} component="footer">
        <Box sx={{ mt: 4 }}>
          <center>
            <img
              src="https://i.hizliresim.com/kti4lvy.png"
              height="100"
              width="100"
              alt=""
            />
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
