import { Button, Container, Grid, TextField, Avatar } from '@mui/material';
import React, {useContext, useState} from 'react'

import { UsersContext } from '../context/userContext';
const Chat = () => {
  const [value, setValue] = useState('')
  const { user } = useContext(UsersContext);


  const sendMessage = async () => {

  }


  const messages = [
    {uid:5, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7,photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
    {uid:7, photoURL: "", displayName:'Mahmut',text : "eGEEEE"},
  ];
  
  return (
      <Container>
          <Grid container
                justifyContent={"center"}
                style={{height: window.innerHeight - 50, marginTop: 20}}>
              <div style={{width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto'}}>
                  {messages.map(message =>
                      <div style={{
                          margin: 10,
                          border: user.user_id === message.uid ? '2px solid green' : '2px dashed red',
                          marginLeft: user.user_id === message.uid ? 'auto' : '10px',
                          width: 'fit-content',
                          padding: 5,
                      }}>
                          <Grid container>
                              <Avatar src={message.photoURL}/>
                              <div>{message.displayName}</div>
                          </Grid>
                          <div>{message.text}</div>
                      </div>
                  )}
              </div>
              <Grid
                  container
                  direction={"column"}
                  alignItems={"flex-end"}
                  style={{width: '80%'}}
              >
                  <TextField
                      fullWidth
                      rowsMax={2}
                      variant={"outlined"}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                  />
                  <Button onClick={sendMessage} variant={"outlined"} style={{marginTop:20}}>Отправить</Button>
              </Grid>
          </Grid>
      </Container>
  );
};

export default Chat;