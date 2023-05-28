import { Box, Divider, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Page404 } from "./Page404";
import { NavBar } from "../components/NavBar";

import { getBookById } from "../services/book";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchData } from "../hooks/useFetchData";
interface Card {
  id: string;
  title: string;
  author: string;
  coverImageURL: string;
  description: string;
}

export default function BookPreview() {
  const { id = "" } = useParams();
  //const [book, setBook] = useState<Book>();
  // const [loading, setLoading] = useState(true);
  //const [error, setError] = useState();

  const {
    loading,
    error,
    data: book,
  } = useFetchData(() => getBookById(id), [id]);

  // useEffect(() => {
  //   getBookById(id)
  //     .then((response) => {
  //       setBook(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id]);

  //de ce merge si daca nu se pune id ca dependenta?
  //const { data: book } = useFetchData<Book>(() => getBookById(id), []);

  if (loading || !book) {
    return <CircularProgress />;
  }

  if (error) {
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
            <Typography>
              Owned by&nbsp;
              <Typography
                component={Link}
                to={`/users-books/${book.owner._id}`}
                color="#01937C"
                fontWeight="bold"
              >
                {book.owner.firstName} {book.owner.lastName}
              </Typography>
            </Typography>
            <Typography variant="body1">{`Added on ${book.createdAt.slice(
              0,
              10
            )}`}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />

        <Typography variant="h3" marginBottom={"0.8em"}></Typography>
        <Typography variant="body1">{book.description}</Typography>
      </Box>
    </>
  );
}
