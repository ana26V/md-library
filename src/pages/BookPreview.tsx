import { Box, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { cardData } from "../components/Cards";
import { Page404 } from "./Page404";
import { NavBar } from "../components/NavBar";

interface Card {
  id: string;
  title: string;
  author: string;
  coverImageURL: string;
  description: string;
  // Add any other necessary properties
}

export default function BookPreview() {
  const { id } = useParams();
  // Use appropriate logic to retrieve the book data for the specified id

  const book: Card | undefined = cardData.find((card) => card.id === id);

  if (!book) {
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
              style={{ width: "100%" }}
              src={book.coverImageURL}
              title={book.title}
              alt={book.title}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h3">{book.title}</Typography>
            <Typography variant="body1">by {book.author}</Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body1" marginBottom={'0.5em'}>{"Owned by ..."}</Typography>
            <Typography variant="body1"  >{"Added on ..."}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />

        <Typography variant="h3" marginBottom={'0.8em'}></Typography>
        <Typography variant="body1">{book.description}</Typography>
      </Box>
    </>
  );
}
