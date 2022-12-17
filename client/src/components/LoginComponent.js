import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import GameFinder from "../apis/GameFinder";
import { UsersContext } from "../context/userContext";

const LoginComponent = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UsersContext);
  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { mail, password } = inputs;
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPass(pass) {
    if (pass.length >= 8) {
      return true;
    } else {
      return false;
    }
  }
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(mail))
        throw { fmessage: "Mail is invalid. Please check the mail field." };
      else if (!isValidPass(password))
        throw {
          fmessage:
            "Password is invalid. Make sure your password is at least eight characters long.",
        };
      const response = await GameFinder.post("/auth/", {
        mail: mail,
        password: password,
      });
      //auth user first
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        navigate("/profile");
      } else throw { fmessage: "There was an unknown problem" };
    } catch (err) {
      if (err.fmessage) setError(err.fmessage);
      else if (err.response.status === 404) setError("Invalid credentials!");
      else setError("There was an unknown problem!");
      console.error("onSubmit form error: ", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mail"
            label="Email Address"
            name="mail"
            autoComplete="mail"
            autoFocus
            onChange={(e) => onChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => onChange(e)}
          />
          <Box m={1} pt={0}>
            {" "}
          </Box>
          {error && (
            <Alert variant="filled" severity="error">
              {" "}
              {error}{" "}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginComponent;
