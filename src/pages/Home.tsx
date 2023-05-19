import { Container, Grid } from "@mui/material";
import Cards from "../components/Cards";
import { NavBar } from "../components/NavBar";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import { Outlet } from "react-router-dom";
import PaginationButtons from "../components/Pagination";

export function Home() {
  return (
    <>
      <NavBar />
      <Box display={"flex"} flexDirection={"column"} minHeight={"100hv"}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} alignItems="center" marginBottom={"2em"}>
            <Grid item xs={6}>
              <h1>HOME</h1>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <SearchBar />
            </Grid>
          </Grid>
          <Cards />
          <Outlet />
           <PaginationButtons />
        </Container>
      </Box>
    </>
  );
}
