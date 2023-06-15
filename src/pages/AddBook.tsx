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
import { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBook, editBook, getBookById } from "../services/book";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchData } from "../hooks/useFetchData";
import { Book } from "../models/Book";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const AddBookSchema = z.object({
  title: z.string().min(1, "Title field is required!"),
  author: z.string().min(1, "Author field is required!"),
  description: z.string().min(2, "Description field is required!"),
  file: z.union([
    z.string(),
    z
      .any()
      .refine((file) => file !== null, "Image field is required!")
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file?.type);
      }, ".jpg, .jpeg, .png, .gif and .webp files are accepted."),
  ]),
});

type FormData = z.infer<typeof AddBookSchema>;

export function AddBook() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(AddBookSchema),
  });

  function handleRenderImageURL(img: any) {
    return img instanceof File ? URL.createObjectURL(img) : img;
  }

  const [book, setBook] = useState<Book>();
  console.log({ book });
  useEffect(() => {
    if (id) {
      getBookById(id)
        .then((response) => {
          console.log(response.data);
          const bookData = response.data;
          setBook(bookData);
          reset({
            title: bookData.title,
            author: bookData.author,
            description: bookData.description,
            file: bookData.coverImageURL,
          });
        })
        .catch((err) => {
          setServerError(err.data.message);
          console.log(err);
        });
    }
  }, [id, reset]);

  function showErrorMessages(key = "") {
    const err = errors[key as keyof FormData];
    return {
      error: Boolean(err),
      helperText: err && (err.message as string),
    };
  }

  function onSubmit(data: FormData) {
    setLoading(true);
    setServerError("");
    if (id) {
      // Editing an existing book
      editBook(data, id)
        .then(() => {
          navigate("/manage");
          toast.success("Successfully edited!");
        })
        .catch((err) => {
          setServerError(err.data.message);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Adding a new book
      addBook(data)
        .then(() => {
          navigate("/manage");
          toast.success("Successfully added!");
        })
        .catch((err) => {
          setServerError(err.data.message);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <>
      <Container>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Typography sx={{ my: 4 }} variant="h4">
            {id ? "Edit a book" : "Add a book"}
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
                label={id ? "" : "Title"}
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
                label={id ? "" : "Author"}
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
                label={id ? "" : "Description"}
                autoComplete="description"
                autoFocus
                {...register("description")}
                {...showErrorMessages("description")}
              ></TextField>
              <Button type="submit" disabled={loading} variant="contained">
                {id ? "Update book" : "Add book"}
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
                      minHeight: "10em",
                    }}
                  >
                    {showErrorMessages("file").error && (
                      <Box sx={{ color: "red" }}>
                        {showErrorMessages("file").helperText}
                      </Box>
                    )}
                    {(!selectedImage || selectedImage === book?.coverImageURL) && (
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<AddAPhotoIcon />}
                      >
                        {id ? " Change Cover Image" : " Upload Cover Image"}
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
                          src={handleRenderImageURL(selectedImage)}
                          alt="book_cover"
                        />

                        {book?.coverImageURL !== selectedImage && (
                          <Button
                            variant="contained"
                            onClick={() => {
                              onChange(book?.coverImageURL);
                            }}
                          >
                            Revert to original
                          </Button>
                        )}
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
