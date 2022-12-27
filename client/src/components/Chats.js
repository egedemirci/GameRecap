import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import ResponsiveAppBar from "./appbarGame";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/db";
import { UsersContext } from "../context/userContext";

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
  const [chats, setChats] = useState([]);
  const queryString = window.location.href;
  const id = queryString.match(/chats\/(\d+)/);
  const navigate = useNavigate();
  const { user } = useContext(UsersContext);

  useEffect(() => {
    const fetchData = async () => {
      const temp = await getDocs(collection(db, "tickets"));
      let chats = [];
      temp.forEach((doc) => {
        if (user.role === "user") {
          console.log(doc.data().ticketer_id);
          console.log(user.user_id);
          if (doc.data().ticketer_id === user.user_id) {
            chats.push({ id: doc.id, ...doc.data() });
          }
        } else {
          chats.push({ id: doc.id, ...doc.data() });
        }
      });
      console.log(chats);
      setChats(chats);
    };
    fetchData();
  }, [user, id]);

  const handleChats = (id) => {
    navigate(`/chats/${id}`);
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Created At",
      width: 300,
      disableColumnMenu: true,
      renderCell(params) {
        return (
          <>{new Date(params.value.seconds * 1000).toLocaleDateString()}</>
        );
      },
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 300,
      disableColumnMenu: true,
    },
  ];

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <Container>
          <center>
            <Toolbar />
            <Typography
              font
              fontWeight="600"
              color="#1d3557"
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mt: 0, md: 3 }}
            >
              Previous Tickets
            </Typography>
            <Paper sx={{ mt: 2 }} component={Box} width={700} height={450}>
              <DataGrid
                rows={chats}
                columns={columns}
                getRowId={function (row) {
                  return row.id;
                }}
                pageSize={20}
                onRowClick={(e) => {
                  handleChats(e.row.id);
                }}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Paper>
          </center>
          <center>
            <Button
              sx={{ mt: 2, mb: 2 }}
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
