import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function AniCard({ item, onClick }) {
  const { title, coverImage } = item;

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="300"
          image={coverImage.large}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" el noWrap>
            {title.romaji}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add To Collections
        </Button>
      </CardActions>
    </Card>
  );
}

export default AniCard;
