import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavBar } from "../components/NavBar";
import { addBook } from "../services/book";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBookSchema = z.object({
  title: z.string().min(1, "Title field is required!"),
  author: z.string().min(1, "Author field is required!"),
  description: z.string().min(2, "Description field is required!"),
  file: z.any().refine((file) => file !== null, "Image field is required!"),
});
type FormData = z.infer<typeof AddBookSchema>;
export function AddBook() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(AddBookSchema),
  });

  function showErrorMessages(key = "") {
    const err = errors[key as keyof FormData];
    return {
      error: Boolean(err),
      helperText: err && err.message,
    };
  }

  function onSubmit(data: FormData) {
    //formData.append("file", data.file);
    setLoading(true);
    setServerError("");
    console.log(data);
    addBook(data)
      .then((book) => {
        navigate("/manage");
        toast.success("Book successfully added");
      })
      .catch((err) => {
        //setServerError(err.data.message);
        // console.log("err", err);
        // console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <NavBar />
      <Container>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography sx={{ my: 4 }} variant="h4">
            Add a book
          </Typography>
          <Grid container>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              md={6}
              xs={12}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                autoComplete="title"
                autoFocus
                {...register("title")}
                {...showErrorMessages("title")}
              ></TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                id="author"
                label="Author"
                autoComplete="author"
                autoFocus
                {...register("author")}
                {...showErrorMessages("author")}
              ></TextField>
              <TextField
                margin="normal"
                fullWidth
                required
                multiline
                rows={4}
                label="Description"
                autoComplete="description"
                autoFocus
                {...register("description")}
                {...showErrorMessages("description")}
              ></TextField>
              <Button type="submit" disabled={loading} variant="contained">
                Add Book
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, value: selectedImage } }) => (
                  <Box
                    sx={{
                      margin: "1.5em",
                      border: "4px dotted gray",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      height: "100%",
                      minHeight: "10em", // Set a minimum height for the box
                    }}
                  >
                    {showErrorMessages("file").error && (
                      <Box sx={{ color: "red" }}>
                        {showErrorMessages("file").helperText}
                      </Box>
                    )}
                    {!selectedImage && (
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<AddAPhotoIcon />}
                      >
                        Upload Cover Image
                        <Input
                          id="file"
                          inputProps={{
                            accept: "image/*",
                          }}
                          type="file"
                          hidden
                          style={{ display: "none" }}
                          {...register("file")}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.files && e.target.files.length > 0) {
                              onChange(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    )}
                    {selectedImage && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          style={{ width: 120, height: 180 }}
                          src={URL.createObjectURL(selectedImage)}
                          alt="book_cover"
                        />
                        <Button
                          variant="contained"
                          onClick={() => {
                            onChange(null);
                          }}
                        >
                          Remove Image
                        </Button>
                        {serverError && (
                          <Alert sx={{ my: 2 }} severity="error">
                            {serverError}
                          </Alert>
                        )}
                      </Box>
                    )}
                  </Box>
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
