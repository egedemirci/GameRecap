import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "./appbarGame";
import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import { db } from "../firebase/db";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";

const Chat = () => {
  const [value, setValue] = useState("");
  const { user } = useContext(UsersContext);
  const [chatRoom, setChatRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  const sendMessage = async () => {
    const docRef = doc(db, "tickets", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        messages: [
          ...messages,
          {
            content: value,
            sender_id: user.user_id,
            timestamp: Date(),
            isAdmin: user.role === "admin" ? true : false,
          },
        ],
      });
    } else {
      console.log("No such document!");
    }
    setValue("");
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tickets", id), (doc) => {
      setChatRoom(doc.data());
      console.log(doc.data());
      setMessages(doc.data().messages);
    });
    return () => unsub();
  }, [id]);

  return (
    <>
      <ResponsiveAppBar />
      <Typography
        variant="h4"
        align="center"
        fontWeight="600"
        sx={{ mt: 4, mb: 4 }}
      >
        Chat Room about {chatRoom.subject}
      </Typography>
      <div
        style={{
          width: "100%",
          height: "70vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message) => (
          <div
            style={{
              display: "flex",
              justifyContent:
                user.user_id === message.sender_id
                  ? "flex-end"
                  : user.role === "admin" && message.isAdmin === true
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Card
              style={{
                borderRadius: 20,
                backgroundColor:
                  user.user_id === message.sender_id ? "#a8dadc" : "#003049",
                margin: "30px 30px 10px 30px", // add margin to top
                border:
                  user.user_id === message.sender_id ? "#1d3557" : "#CADFE2",
                width: "40%",
                padding: 5,
                fontSize: "0.9rem",
              }}
            >
              <CardContent
                style={{
                  color:
                    user.user_id === message.sender_id ? "#1d3557" : "#CADFE2",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color:
                      user.user_id === message.sender_id
                        ? "#1d3557"
                        : "#CADFE2",
                  }}
                >
                  {message.isAdmin ? "Admin says:" : "User says:"}
                </p>
                <p>{message.content}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <center>
        <TextField
          mt={20}
          style={{ width: "100vh" }}
          rows={5}
          multiline
          variant={"outlined"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </center>
      <center>
        <Button
          variant="contained"
          sx={{ mt: 4, mb: 4, align: "center" }}
          onClick={sendMessage}
        >
          Send Message{" "}
        </Button>
      </center>
      <Grid
        container
        direction={"column"}
        alignItems={"flex-end"}
        style={{ width: "80%" }}
      ></Grid>
    </>
  );
};

export default Chat;
