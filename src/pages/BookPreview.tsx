import { Box, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Page404 } from "./Page404";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import { Book } from "../models/Book";
import { getBookById } from "../services/book";
import CircularProgress from "@mui/material/CircularProgress";
interface Card {
  id: string;
  title: string;
  author: string;
  coverImageURL: string;
  description: string;
  // Add any other necessary properties
}

export default function BookPreview() {
  const { id = "" } = useParams();
  const [book, setBook] = useState<Book>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getBookById(id)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !book) {
    return <CircularProgress />;
  }

  if (error) {
    // Handle the case when the book data is not available
    return <Page404 />;
  }

  return (
    <>
      <NavBar />
      <Box margin={"2em"}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <img
              style={{ width: "70%" }}
              src={book.coverImageURL}
              title={book.title}
              alt={book.title}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h3">{book.title}</Typography>
            <Typography variant="body1">by {book.author}</Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" marginBottom={"0.5em"}>
              {" "}
              Owned by {book.owner.firstName} {book.owner.lastName}
            </Typography>
            <Typography variant="body1">{"Added on ..."}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />

        <Typography variant="h3" marginBottom={"0.8em"}></Typography>
        <Typography variant="body1">{book.description}</Typography>
      </Box>
    </>
  );
}
