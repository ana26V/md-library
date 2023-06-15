import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationButtonsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationButtons({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationButtonsProps) {
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack spacing={2} marginTop="2em">
      <Pagination
        count={totalPages}
        page={currentPage}
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "1.2rem",
          },
        }}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
