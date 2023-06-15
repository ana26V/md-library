import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { getMyBooks, deleteBook } from "../services/book";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function ManageBooks() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const {
    data: books,
    refetchData,
    loading,
  } = useFetchData(getMyBooks, [], []);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  const showToastMessage = () => {
    toast.success("Bravo vere !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleClickOpen = (bookId: string) => {
    setIdToDelete(bookId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBook = () => {
    deleteBook(idToDelete)
      .then(() => {
        handleClose();
        showToastMessage();
        refetchData();
      })
      .catch((error) => {
        console.log("Error deleting book:", error);
        handleClose();
      });
  };

  if (loading) {
    <CircularProgress />;
  }
  const columns: GridColDef[] = [
    {
      field: "coverImageURL",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img height={"90px"} src={params.value} alt="Book Cover" />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 160,
      valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 160,
      valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleClickOpen(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"Delete Book"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item? This process cannot
                be undone!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" autoFocus onClick={handleDeleteBook}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <IconButton onClick={() => handleClickEditBook(params.row.id)}>
            <EditIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = books || [];

  function handleClickAddBook() {
    navigate("/addbook");
  }
  function handleClickEditBook(id: string) {
    navigate(`/addbook/edit/${id}`);
  }

  return (
    <>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center" marginBottom={"2em"}>
            <Grid item xs={6}>
              <Typography variant="h3">Manage Books</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ p: "0.8em 1.3em" }}
                onClick={handleClickAddBook}
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
