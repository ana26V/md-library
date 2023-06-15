import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../services/auth";
import { useState } from "react";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";

const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "First Name field is required!"),
    lastName: z.string().min(2, "Last Name field is required!"),
    email: z
      .string()
      .min(3, "Email field is required!")
      .email("Enter a valid email!"),
    password: z.string().min(4, "Password field is required!"),
    confirmPassword: z.string().min(4, "Confirm Password is required!"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords not matching!",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  function handleClickLogin() {
    navigate("/login");
  }

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  function showErrorMessages(key = "") {
    const err = formState.errors[key as keyof FormData];
    return {
      error: Boolean(err),
      helperText: err && err?.message,
    };
  }
  function onSubmit(credentials: FormData) {
    console.log(credentials);

    signUp(credentials)
      .then(() => {
        navigate("/login");
        toast.success("Successfully created account!");
      })
      .catch((error) => {
        console.log("Error in SignUp:  ", error);
        setServerError(error.response.data.message);
      });
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName")}
                {...showErrorMessages("firstName")}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName")}
                {...showErrorMessages("lastName")}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email")}
                {...showErrorMessages("email")}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password")}
                {...showErrorMessages("password")}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("confirmPassword")}
                {...showErrorMessages("confirmPassword")}
                label="Confirm Password"
                fullWidth
                required
                type="password"
              />
            </Grid>
          </Grid>
          {serverError && (
            <Alert
              sx={{ my: 2 }}
              severity="error"
              style={{ marginTop: "1.3em" }}
            >
              {serverError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Link href="#" variant="body1" onClick={handleClickLogin}>
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
