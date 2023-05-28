import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";

const UserCredentials = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof UserCredentials>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(UserCredentials) });

  const { loginUser } = useAuthContext();

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function handleClickHome() {
    navigate("/");
  }
  function handleClickSignup() {
    navigate("/signup");
  }

  function onSubmit(credentials: FormData) {
    loginUser(credentials)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error in Login:  ", error);
        setServerError(error.response.data.message);
      });
  }
  function showErrorMessages(key = "") {
    const err = errors[key as keyof FormData];
    return {
      error: Boolean(err),
      helperText: err && err?.message,
    };
  }
  return (
    <Container component="main" maxWidth="xs">
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email")}
            {...showErrorMessages("email")}
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
            {...register("password")}
            {...showErrorMessages("password")}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {serverError && (
            <Alert severity="error" style={{ marginTop: "0.9em" }}>
              {serverError}
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

          <Link href="#" variant="body1" onClick={handleClickSignup}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
