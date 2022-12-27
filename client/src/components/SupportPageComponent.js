import { UsersContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Divider,Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

export default function SupportPageComponent() {
  const { user } = useContext(UsersContext);
  const [date, setDate] = useState(new Date());
  const [chatroom, setChatroom] = useState(null);
  const role = user.role;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch messages from Firebase
    if (role === "admin") {
      // Fetch all messages from Firebase
    } else {
      // Fetch messages from Firebase for this user
    }
  }, [role]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Firebase logic goes here
  };

  const content =
    role === "admin" ? (
      <>
        <h1 align="center">Admin Support Page</h1>
        <p>Admin Support Page Content</p>
      </>
    ) : (
      <>
        <h1 align="center">User Support Page</h1>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <p>Chatroom</p>
          </Grid>
        </Grid>
      </>
    );
    return (
      <>
        <Box display="flex" flexDirection="column">
          <Typography

            font
            fontWeight="600"
            color = "#1d3557"
            
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mt: 3}}
          >
              Support Page
          </Typography>
          <Container maxWidth="md" component="main">
            <Typography variant="h6"             font
            fontWeight="500"
            color = "#457b9d" component="h2" gutterBottom>
              User Name
            </Typography>
            <TextField
              fullWidth
              label="Your Name"
              required
              variant="outlined"
            />
            <Typography variant="h6" font fontWeight = "500" color = "#457b9d" component="h2" gutterBottom sx={{ mt:1 }}>
              Select Subject
            </Typography>
            <Autocomplete
              disablePortal
              required
              options={top100Films}
              renderInput={(params) => (
                <TextField {...params} required label="Subject" />
              )}
            />
            <Typography variant="h6" font fontWeight = "500" color = "#457b9d" component="h2" gutterBottom sx={{ mt: 1 }}>
              Message
            </Typography>
<TextField
fullWidth
              label="Your Message"
              variant="outlined"
              required
              multiline
              rows={4}
            />
                      <Typography variant="h6" font fontWeight = "500" color = "#457b9d"  component="h2" gutterBottom sx={{ mt: 1 }}>
              Date
            </Typography>
            <TextField
            fullWidth
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              id="date"
              type="date"
            />
            <Box textAlign="center">
              <Button
                variant="contained"
                sx={{ mt:4, align: "center" }}
                onClick={handleSendMessage}
              >
Send Message              </Button>
<Button
                variant="contained"
                sx={{ mt:4, ml:3, align: "center" }}
                onClick={() => {
                  navigate("/chats");
                }}              >
                Previous Chats              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
}
