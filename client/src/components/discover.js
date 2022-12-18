import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, CircularProgress, Paper } from "@mui/material";
import GameFinder from "../apis/GameFinder";
import ResponsiveAppBar from "./appbarGame";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d3557",
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
    sixth: {
      main: "#ffb703",
    },
  },
});

const sectheme = createTheme({
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
    sixth: {
      main: "#ffb703",
    },
  },
});

export const Discover = () => {
  const [isLoading, setLoading] = useState(true);
  const [discover, setDiscover] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await GameFinder.get(`/discover`);
        setDiscover(response.data.data.games);
        setLoading(false);
      } catch (err) {}
    };

    fetcData();
  }, []);

  const handlePlaylistSelect = (id) => {
    navigate(`/games/${id}`);
  };

  const columns = [
    {
      field: "playlist_id",
      headerName: "Playlist ID",
      width: 90,
      disableColumnMenu: true,

      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handlePlaylistSelect(params.row.playlist_id)}
          >
            {params.row.playlist_id}
          </Button>
        );
      },
    },
    {
      field: "playlist_name",
      headerName: "Playlist Name",
      width: 300,
      disableColumnMenu: true,
    },
    {
      field: "string_agg",
      headerName: "Most Common Genre",
      width: 300,
      disableColumnMenu: true,
    },
  ];

  const rows = discover;
  console.log(rows);

  return (
    <div>
      <main>
        <ThemeProvider theme={sectheme}>
        <div>
        <main>
          <ResponsiveAppBar />
          </main>
          </div>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Box
            sx={{
              height: 600,
              width: "100%",
            }}
          >
            <Container>
              <center>
                <Toolbar />
                <Paper component={Box} width={700} height={500}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.playlist_id}
                    pageSize={20}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Paper>
              </center>
            </Container>
          </Box>
        </ThemeProvider>
      </main>
    </div>
  );
};

export default Discover;
