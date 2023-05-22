import {  TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <>
      
        <TextField
          id="standard-search"
          label={<SearchIcon />}
          type="search"
          variant="standard"
          sx={{ width: 300 }}
        
        />
    
    </>
  );
  }