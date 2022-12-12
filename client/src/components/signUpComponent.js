import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import GameRecap_API from "../apis/GameRecap_API";

const SignUpComponent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
    username: ""
  });  

  const { mail, username, password } = inputs;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(pass) {
    if(pass.length >= 8)
    {
      return true;
    } else{
      return false;
    }
  };

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if(!isValidEmail(mail))
          throw{fmessage: "Mail is invalid. Please check the mail field."}
        if(!isValidPass(password))
          throw{fmessage: "Password is invalid. Make sure your password is at least eight characters long."}
        if(username.length === 0)
            throw{fmessage: "Please fill all the fields."}
    // TODO: Update these methods
      const response = await GameRecap_API.post("/users/", {
        mail: mail,
        username: username,
        password: password,
      })
      if(response.status==200){
          localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/profile/");
        }
    } catch (err) {
        if(err.fmessage)
            setError(err.fmessage)
        else if(err.response.status == 401)
            setError("Selected mail is already in use, please change your mail.")
        else if(err.response.status == 402)
            setError("Invalid security key. Please make sure you are using a correct key that matches your role.")
        else
            setError("There was an unknown problem")
        console.error('onSubmit form error: ', err);
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant="h4">
                Register
            </Typography>
          <Box m={1} pt={0} />
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={e => onChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mail"
                  label="Email Address"
                  name="mail"
                  autoComplete="email"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => onChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={1} pt={0}> </Box>
            {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
            <Button
              type="submit"
              color = "secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>);
}
export default SignUpComponent;

