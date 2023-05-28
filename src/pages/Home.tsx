import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Cards from "../components/Cards";
import { NavBar } from "../components/NavBar";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";
import PaginationButtons from "../components/Pagination";
import { getAllBooks } from "../services/book";
import { useFetchData } from "../hooks/useFetchData";

export function Home() {
  const { data: books } = useFetchData(getAllBooks, [], []);

  if (!books) {
    return <CircularProgress />;
  }
  console.log(books);
  return (
    <>
      <NavBar />
      <Box display={"flex"} flexDirection={"column"} minHeight={"100hv"}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} alignItems="center" marginBottom={"2em"}>
            <Grid item xs={6}>
              <Typography variant="h3">HOME</Typography>
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
