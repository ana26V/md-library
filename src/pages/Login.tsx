import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";

const theme = createTheme();

const UserCredentials = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

export function Login() {
  // const { formValues, registerField } = useForm({
  //   resolver: yupResolver(UserCredentials)
  // });

  
  const [serverError, setServerError] = React.useState("");
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
    const userCredenstials = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      
    };
    login(userCredenstials)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      setServerError(error);
    });
    // validare inainte de login
    // login(userCredenstials)
    //   .then(() => {
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     setServerError(error);
    //   });
   
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Typography component="h5">
            or
            <Link href="#" variant="body1" onClick={handleClickHome}>
              {" explore the app"}
            </Link>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
          //    {...registerField("email")}
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

            <Link href="#" variant="body1" onClick={handleClickSignup}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
