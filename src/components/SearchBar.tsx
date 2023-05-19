// import { TextField } from '@mui/material';
// import { useState } from 'react';

// export default function SearchBar() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <TextField
//       id="search"
//       type="search"
//       label="Search"
//       value={searchTerm}
//       onChange={handleChange}
//       sx={{ width: 400 }}
//     />
//   );
// }
import { Container, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import Cards, { cardData } from "./Cards";
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredCards, setFilteredCards] = useState(cardData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    filterCards(e.target.value);
  };

  const filterCards = (searchValue: string) => {
    const filtered = cardData.filter((card) =>
      card.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  
  return (
    <>
      
        <TextField
          id="standard-search"
          label={<SearchIcon />}
          type="search"
          variant="standard"
          sx={{ width: 300 }}
          onChange={handleChange}
        />
    
    </>
  );
  }