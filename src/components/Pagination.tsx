import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons() {
  return (
    <Stack spacing={2} marginTop={'2em'}>
      <Pagination
        count={10}
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "1.2rem", // Adjust the font size as needed
          },
        }}
      />
    </Stack>
  );
}
