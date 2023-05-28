import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { NavBar } from "../components/NavBar";
import Box from "@mui/material/Box";
import { Outlet, useParams } from "react-router-dom";
import PaginationButtons from "../components/Pagination";
import { getBookByUserId } from "../services/book";
import { useFetchData } from "../hooks/useFetchData";
import { Page404 } from "./Page404";
import { BookCard } from "../components/BookCard";
import { Book } from "../models/Book";

export function UsersBooks() {
  const { _id = "" } = useParams();
  const {
    loading,
    error,
    data: book,
  } = useFetchData(() => getBookByUserId(_id), [_id]);

  if (loading || !book) {
    return <CircularProgress />;
  }

  if (error) {
    return <Page404 />;
  }

  console.log(book);
  return (
    <>
      <NavBar />
      <Box
        display={"flex"}
        flexDirection={"column"}
        minHeight={"100hv"}
        marginTop={"1.7em"}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Typography variant="h4"> Books owned by:&nbsp;</Typography>
            <Typography
              sx={{ my: 4 }}
              variant="h4"
              color="#01937C"
              fontWeight="bold"
            >
              {book.user.firstName} {book.user.lastName}
            </Typography>
          </Grid>

          {/* <Cards books={book} /> */}
          <Grid container spacing={4.5}>
            {book.books.map((book: Book) => (
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
          <Outlet />
          <PaginationButtons />
        </Container>
      </Box>
    </>
  );
}
