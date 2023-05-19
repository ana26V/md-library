import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { BookCard } from './BookCard';
export const cardData = [
  {
    id: '1234',
    title: 'Card 1',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '12347',
    title: 'Card 2',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '12340',
    title: 'Caaard 3',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '12349',
    title: 'sos ugi',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id:'123214214',
    title: 'mama mea',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '0001234',
    title: 'Card 1222',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '001234',
    title: 'Card 21',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },
  {
    id: '01234',
    title: 'Card 1111',
    author: 'aaaaaaaaaaaaaaaaaa aa a a',
    
   
    coverImageURL: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
 
    description: 'This is the description for Card 1.',
  },

];

export default function CardSet() {
  return (
    <Box>
    <Grid container spacing={4.5}>
      {cardData.map((book) => (
        <Grid key={book.id} item xs={12} sm={6} md={6} lg={3}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  </Box>
  );
}
