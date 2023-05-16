import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
const cardData = [
  {
    title: 'Card 1',
    description: 'This is the description for Card 1.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  },
  {
    title: 'Card 2',
    description: 'This is the description for Card 2.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  },
  {
    title: 'Card 3',
    description: 'This is the description for Card 3.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  }, {
    title: 'Card 3',
    description: 'This is the description for Card 3.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  }, {
    title: 'Card 3',
    description: 'This is the description for Card 3.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  }, {
    title: 'Card 3',
    description: 'This is the description for Card 3.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  }, {
    title: 'Card 3',
    description: 'This is the description for Card 3.',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/yellow-business-leadership-book-cover-design-template-dce2f5568638ad4643ccb9e725e5d6ff.jpg?ts=1637017516',
  },
];

export default function CardSet() {
  return (
    <Grid container spacing={4} justifyContent="center" marginTop="1rem">
      {cardData.map((card, index) => (
         <Grid item key={index}>
        <Card key={index} sx={{ maxWidth: 280 }}>
          <CardMedia
            component="img"
            height="340"
            image={card.image}
            alt={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      ))}
    </Grid>
  );
}
