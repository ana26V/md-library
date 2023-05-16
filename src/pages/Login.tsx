// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export function Login() {
//   const navigate = useNavigate();

//   function handleClickHome() {
//     navigate("/");
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <Button variant="contained" onClick={handleClickHome}>Go To Home</Button>
//     </div>
//   );
// }
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export function Login() {
  const navigate = useNavigate();

    function handleClickHome() {
      navigate("/");
    }
    function handleClickSignup() {
      navigate("/signup");
    }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Typography component="h5" >
            or 
                <Link href="#" variant="body1"
                onClick={handleClickHome}
                >
                  {" explore the app"}
                </Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Sign In
            </Button>
            
                <Link href="#" variant="body1"
                onClick={handleClickSignup}>
                  {"Don't have an account? Sign Up"}
                </Link>
              
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}