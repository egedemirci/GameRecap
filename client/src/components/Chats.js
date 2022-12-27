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
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Button, CircularProgress, Paper } from "@mui/material";
import ResponsiveAppBar from "./appbarGame";
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
    sixth: {
      main: "#ffb703",
    },
  },
});

const sectheme = createTheme({
  palette: {
    primary: {
      main: "#f1faee",
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
export const ChatPage = () => {

    const [isLoading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const queryString = window.location.href;
    const id = queryString.match(/chats\/(\d+)/);
  
    const navigate = useNavigate();
    useEffect(() => {
      const fetcData = async () => {
        try {
        } catch (err) {}
      };
  
      fetcData();
    }, [id]);


  const handleChats = (id) => {
    navigate(`/chats/${id}`);
  };
  const messages = [
    { chatId: 1, username: 'John' },
    { chatId: 2, username: 'Jane' },
    { chatId: 3, username: 'Bob' },
    { chatId: 4, username: 'Alice' },
    { chatId: 5, username: 'Eve' },
  ];
  

  const columns = [
    {
      field: "chatId",
      headerName: "Chat ID",
      width: 90,
      disableColumnMenu: true,

      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleChats(params.row.chatId)}
          >
            {params.row.chatId}
          </Button>
        );
      },
    },
    {
      field: "username",
      headerName: "User Name",
      width: 600,
      disableColumnMenu: true,
    },
  ];

  const rows = messages;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar/>

          <Container>
            <center>
              <Toolbar />
              <Typography

font
fontWeight="600"
color = "#1d3557"

variant="h4"
component="h1"
align="center"
gutterBottom
sx={{ mt: 0, md:3}}

>
  Chat Rooms
</Typography>
              <Paper  sx={{ mt: 2}} component={Box} width={700} height={450}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  getRowId={(row) => row.chatId}
                  pageSize={20}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Paper>
            </center>
            <center>
            <Button
          sx={{ mt: 2}}
              variant="contained"
              color="success"
              onClick={() => {
                navigate("/support");
              }}
              style={{ justifyContent: "center" }}
            >
              Support Page
            </Button>
            </center>
          </Container>
      </ThemeProvider>
    </>
  );
};

export default ChatPage;
