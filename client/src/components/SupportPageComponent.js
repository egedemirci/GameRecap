import { UsersContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

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
      <Typography component="h1" variant="h3" align="center">
        Support Page
      </Typography>
      <Grid container sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Box component="form" onSubmit={handleSendMessage} mt={2}>
            <Typography component="h2" variant="h6" color="#1d3557">
              You are messaging as {user.username}. <br />
              Please fill out the form below to send a message <br />
              to our support team.
            </Typography>
            <TextField
              label="Your Name"
              required
              variant="outlined"
              sx={{ width: 300 }}
            />
            <Autocomplete
              disablePortal
              required
              options={top100Films}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} required label="Subject" />
              )}
            />
            <TextField
              label="Your Message"
              variant="outlined"
              required
              sx={{ width: 300 }}
              multiline
              rows={4}
            />
            <TextField
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              id="date"
              type="date"
            />
            <Button type="submit" variant="contained">
              Send Message
            </Button>
          </Box>
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{
            borderRight: "solid #1d3557",
            borderRightWidth: 1,
            height: "80vh",
          }}
        />
        <Grid item xs={12} md={7.9}>
          <Typography component="h2" variant="h5" color="#1d3557">
            Previous Chats
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
