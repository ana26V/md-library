import { Container, Grid, Typography } from "@mui/material";
import Cards from "../components/Cards";
import { NavBar } from "../components/NavBar";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import PaginationButtons from "../components/Pagination";
import { getAllBooks } from "../services/book";
import { Book } from "../models/Book";

export function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    getAllBooks().then((response) => {
      console.log(response);
      setBooks(response.data);
    });
  }, [])
  

  return (
    <>
      <NavBar />
      <Box display={"flex"} flexDirection={"column"} minHeight={"100hv"}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} alignItems="center" marginBottom={"2em"}>
            <Grid item xs={6}>
              <Typography variant="h1">HOME</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <SearchBar />
            </Grid>
          </Grid>
          <Cards books={books} />
          <Outlet />
           <PaginationButtons />
        </Container>
      </Box>
    </>
  );
}
