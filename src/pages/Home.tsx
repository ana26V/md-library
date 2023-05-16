import { Grid } from "@mui/material";
import Cards from "../components/Cards";
import { NavBar } from "../components/NavBar";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";

export function Home() {
  return (
    <>
      <NavBar />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid container item xs={8} spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <h1>HOME</h1>
          </Grid>
          <Grid item xs={6}>
            <SearchBar />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Cards />
        </Grid>
      </Grid>
    </>
  );
}
