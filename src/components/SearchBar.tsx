import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <>
      <TextField
        id="standard-search"
        label={<SearchIcon />}
        type="search"
        variant="standard"
        sx={{ width: 300 }}
        value={searchQuery}
        onChange={handleSearch}
      />
    </>
  );
}
