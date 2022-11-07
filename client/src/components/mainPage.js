import * as React from 'react';
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




export default function MainPage() {
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
            <Typography
              variant="h3"
              align="center"
              color="#70798C"
              gutterBottom
            >
              Welcome, @Username
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="#70798C"
              gutterBottom
            >
              Name, Surname
            </Typography>
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