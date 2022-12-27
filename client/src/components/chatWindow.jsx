import { Button, Container, Grid, TextField, Avatar, Chip, Card, CardContent, CardMedia } from '@mui/material';
import React, {useContext, useState} from 'react'
import { UsersContext } from '../context/userContext';
import ResponsiveAppBar from './appbarGame';
const Chat = () => {
  const [value, setValue] = useState('')
  const { user } = useContext(UsersContext);


  const sendMessage = async () => {

  }


  const messages = [
    {uid:5, photoURL: "", displayName:'Mahmut',text : "Based on ancient mythologies, the story follows Kratos, a Spartan warrior and later the Greek God of War, who was tricked into killing his family by his former master, the original Greek God of War Ares. This sets off a series of events that leads to wars with the different mythological pantheons."},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7,photoURL: "", displayName:'Mahmut',text : "Based on ancient mythologies, the story follows Kratos, a Spartan warrior and later the Greek God of War, who was tricked into killing his family by his former master, the original Greek God of War Ares. This sets off a series of events that leads to wars with the different mythological pantheons."},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
  ];
  
  return (
    <>
        <ResponsiveAppBar/>


 <div style={{width: '100%', height: '70vh',  overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
  {messages.map(message =>
    <div style={{display: 'flex', justifyContent: user.user_id === message.uid ? 'flex-end' : 'flex-start'}}>
      <Card
        style={{
          borderRadius: 20,
          backgroundColor: user.user_id === message.uid ? '#a8dadc' : '#003049',
          margin: '30px 30px 10px 30px', // add margin to top
          border: user.user_id === message.uid ? '#1d3557' : '#CADFE2',
          width: '60%',
          padding: 5,
          fontSize: '0.9rem',

        }}
      >
    <CardContent style={{ color:user.user_id === message.uid ? '#1d3557' : '#CADFE2' }}>
    <p style={{ fontWeight: 'bold', color: user.user_id === message.uid ? '#1d3557' : '#CADFE2' }}>User says:</p>
      <p>{message.text}</p>
    </CardContent>
        <CardMedia
          image={message.photoURL}
          avatar={true}
        />
      </Card>
    </div>
  )}
</div>
<center>
<TextField
                  mt = {23}
                  style={{ width: "1450px" }}

                      rowsMax={2}
                      variant={"outlined"}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                  />
                  </center>
                  <center> 
                  <Button
                variant="contained"
                sx={{ mt:4, ml:3, align: "center" }}
                onClick={sendMessage}   >
                Send Message              </Button></center>
              <Grid
                  container
                  direction={"column"}
                  alignItems={"flex-end"}
                  style={{width: '80%'}}
              >
       </Grid>
      </>
  );
};

export default Chat;