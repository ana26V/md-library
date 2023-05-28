import { Box, Grid } from "@mui/material";
import { BookCard } from "./BookCard";
import { Book } from "../models/Book";

interface CardSetProps {
  books: Book[];
}

export default function CardSet({ books }: CardSetProps) {
  return (
    <Box>
      <Grid container spacing={4.5}>
        {books.map((book) => (
          <Grid key={book.id} item xs={12} sm={6} md={6} lg={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
