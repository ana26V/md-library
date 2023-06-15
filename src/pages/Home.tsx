import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Cards from "../components/Cards";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import PaginationButtons from "../components/Pagination";
import { searchBooks } from "../services/book";
import { useFetchData } from "../hooks/useFetchData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState, SetStateAction } from "react";

const BOOKS_PER_PAGE = 8;

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 1);

  const handleSearch = (query: SetStateAction<string>) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: searchResult } = useFetchData(
    () =>
      searchBooks(
        searchQuery,
        BOOKS_PER_PAGE,
        (currentPage - 1) * BOOKS_PER_PAGE
      ),
    [currentPage, searchQuery]
  );

  if (!searchResult) {
    return <CircularProgress />;
  }

  const { totalCount, results: books } = searchResult;

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100hv">
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={2} alignItems="center" marginBottom="2em">
            <Grid item xs={6}>
              <Typography variant="h3">HOME</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <SearchBar onSearch={handleSearch} />
            </Grid>
          </Grid>
          <Cards books={books} />

          <PaginationButtons
            totalPages={Math.ceil(totalCount / BOOKS_PER_PAGE)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Container>
      </Box>
    </>
  );
}
