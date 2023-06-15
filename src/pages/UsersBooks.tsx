import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet, useParams } from "react-router-dom";
import { getBookByUserId } from "../services/book";
import { useFetchData } from "../hooks/useFetchData";
import { Page404 } from "./Page404";
import Cards from "../components/Cards";

export function UsersBooks() {
  const { _id = "" } = useParams();
  const {
    loading,
    error,
    data: userBooks,
  } = useFetchData(() => getBookByUserId(_id), [_id]);

  if (loading || !userBooks) {
    return <CircularProgress />;
  }

  if (error) {
    return <Page404 />;
  }

  console.log(userBooks);
  return (
    <>
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
              {userBooks.user.firstName} {userBooks.user.lastName}
            </Typography>
          </Grid>

          <Cards books={userBooks.books} />

          <Outlet />
        </Container>
      </Box>
    </>
  );
}
