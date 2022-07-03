import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';

function AniCard({ item, onClick, removable, onButtonClick }) {

  const { title, coverImage } = item;

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="300"
          image={coverImage.large}
          alt={title.romaji}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" el="true" noWrap>
            {title.romaji}
          </Typography>
        </CardContent>
      </CardActionArea>
      {removable
        ? <CardActions>
            <Button size="small" color="error" onClick={onButtonClick} startIcon={<FiTrash2 size={18} />} >
              Remove
            </Button>
          </CardActions>
        : <CardActions>
            <Button size="small" color="primary">
              Add To Collections
            </Button>
          </CardActions>
      }
      
    </Card>
  );
}

export default AniCard;
