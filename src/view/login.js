import React, { useState } from 'react';
import Axios from 'axios';
import  { Redirect, useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { staffLogin } from '../test/mochApi';

const apiAdr = "http://localhost:1337";
const apiKey = "90301a26-894c-49eb-826d-ae0c2b22a405";

const theme = createTheme();

export default function SignIn({test = false}) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const mochSubmit = async (event) => {
      event.preventDefault();
      let res = staffLogin({
        email,
        password
      });
      try {
        if (res.data.token);
      } catch(e) {
        setErrorMsg("Wrong Email/Password combination!")
      }
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    Axios.post(`${apiAdr}/v1/auth/staff/login?apiKey=${apiKey}`, {
        email: email,
        password: password
    }).then((response) => {
        sessionStorage.setItem("token", response.data.data.token);
        sessionStorage.setItem("user", response.data.data.user);
        history.push("/dashboard");
    }).catch(() => {
        setErrorMsg("Wrong Email/Password combination!")
    })
  };
  if (sessionStorage.getItem("token")) {
      return <Redirect to="/dashboard" />
  } else {
    return (
        <ThemeProvider theme={theme}>
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography component="h1" variant="h5" style={{color: 'darkred'}} data-testid="error">
                {errorMsg}
              </Typography>
              <Box component="form" onSubmit={!test ? handleSubmit : mochSubmit} noValidate sx={{ mt: 1 }} data-testid="form">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  data-testid="submit"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
  }
}