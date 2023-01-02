import { UsersContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/db";
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

export default function SupportPageComponent() {
  const [subject, setSubject] = useState("Subject1");
  const { user } = useContext(UsersContext);
  const navigate = useNavigate();
  const role = user.role;

  useEffect(() => {}, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      console.log("Trying...");
      await addDoc(collection(db, "tickets"), {
        ticketer_id: user.user_id,
        ticketer_name: data.get("name"),
        createdAt: new Date(),
        subject: subject,
        messages: [
          {
            content: data.get("message"),
            sender_id: user.user_id,
            timestamp: Date(),
            isAdmin: false,
          },
        ],
      });
      console.log("Done");
    } catch (err) {
      console.log(err);
    }
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
      <Box
        component="form"
        onSubmit={handleSendMessage}
        display="flex"
        flexDirection="column"
      >
        <Typography
          font
          fontWeight="600"
          color="#1d3557"
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mt: 3 }}
        >
          Support Page
        </Typography>
        <Container maxWidth="md" component="main">
          <Typography
            variant="h6"
            font
            fontWeight="500"
            color="#457b9d"
            component="h2"
            gutterBottom
          >
            User Name
          </Typography>
          <TextField fullWidth name="name" required variant="outlined" />
          <Typography
            variant="h6"
            font
            fontWeight="500"
            color="#457b9d"
            component="h2"
            gutterBottom
            sx={{ mt: 1 }}
          >
            Select Subject
          </Typography>
          <Select
            fullWidth
            required
            value={subject}
            label="Subject"
            id="demo-simple-select-label"
            onChange={(e) => setSubject(e.target.value)}
          >
            <MenuItem value={"General Support"}>General Support</MenuItem>
            <MenuItem value={"Bug Report"}>Bug Report</MenuItem>
            <MenuItem value={"Recommendations"}>Recommendations</MenuItem>
          </Select>
          <Typography
            variant="h6"
            font
            fontWeight="500"
            color="#457b9d"
            component="h2"
            gutterBottom
            sx={{ mt: 1 }}
          >
            Message
          </Typography>
          <TextField
            fullWidth
            name="message"
            variant="outlined"
            required
            multiline
            rows={4}
          />
          <Box textAlign="center" mb={4}>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 4, align: "center" }}
            >
              Send Message{" "}
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 4, ml: 3, align: "center" }}
              onClick={() => {
                navigate("/chats");
              }}
            >
              Previous Chats{" "}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
