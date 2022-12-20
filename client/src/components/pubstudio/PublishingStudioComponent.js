import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useContext, useState } from "react";
import GameFinder from "../../apis/GameFinder";
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
import AddNewPubStudio from "./AddNewPublishingStudioComponent";

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

export default function PublishingStudioComponent() {
  const { user } = useContext(UsersContext);
  const [pubs, setPubs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GameFinder.get("/publishingstudios");
        setPubs(response.data.data.games);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setPubs]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await GameFinder.delete(`/publishingstudios/${id}`);
      setPubs(
        pubs.filter((pub) => {
          return pub.p_studio_id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = [];
    if (filter === " ") {
      response = await GameFinder.get(`/developmentstudios`);
    } else {
      response = await GameFinder.post(`/developmentstudios/filter`, {
        filter: filter,
      });
    }
    setPubs(response.data.data);
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
          <Container maxWidth="sm" sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1">
              Filter
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography variant="h6" component="h10">
                Name
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                id="date"
                className="form-control"
                type="text"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Filter
              </Button>
              <Grid container></Grid>
            </Box>
            <Box sx={{ mt: 3 }}></Box>
            <Typography sx={{ mb: 2 }} variant="h4" component="h1">
              Studios
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Studio ID</StyledTableCell>
                    <StyledTableCell align="right">Studio Name</StyledTableCell>

                    {user.role === "admin" ? (
                      <StyledTableCell align="right">Delete</StyledTableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pubs.map((pub) => (
                    <StyledTableRow key={pub.p_studio_id}>
                      <StyledTableCell align="right">
                        {pub.p_studio_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {pub.studio_name}
                      </StyledTableCell>
                      {user.role === "admin" ? (
                        <StyledTableCell align="right">
                          {" "}
                          <button
                            onClick={(e) => handleDelete(e, pub.p_studio_id)}
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
          {user.role === "admin" ? <AddNewPubStudio /> : null}
        </Box>
      </main>
      <Box sx={{ bgcolor: "#D3EDEE" }} component="footer">
        <Box sx={{ pt: 3 }}>
          <center>
            <img
              src="https://i.hizliresim.com/kti4lvy.png"
              height="100"
              width="100"
              alt="logo"
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
