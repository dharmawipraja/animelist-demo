import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { FiHeart, FiTrash2 } from 'react-icons/fi';

function AniCard({
  item,
  notitle,
  onCardClick, 
  removable,
  onButtonClick,
  isCollection
}) {
  const { id, title, coverImage } = item;
  const color = isCollection ? 'red' : '#5c728a';
  const fill = isCollection ? 'red' : 'transparent';

  const onCardActionClick = (onButtonClick) => () => {
    onButtonClick(id);
  };

  const renderTitle = () => (
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" el="true" noWrap>
        {title.romaji}
      </Typography>
    </CardContent>
  )

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={onCardClick}>
        <CardMedia
          component="img"
          height="300"
          image={coverImage.large}
          alt={title.romaji}
        />
        {!notitle && renderTitle()}
      </CardActionArea>
      {removable
        ? <CardActions>
            <Button size="small" color="error" onClick={onButtonClick} startIcon={<FiTrash2 size={18} />} >
              Remove
            </Button>
          </CardActions>
        : <CardActions>
            <Button size="small" color="primary" onClick={onCardActionClick(onButtonClick)}>
              <Typography sx={{ fontSize: 14, mr: 4, color: '#5c728a' }}>
                Add To Collections
              </Typography>
              <FiHeart size={18} color={color} fill={fill} />
            </Button>
          </CardActions>
      }
    </Card>
  );
}

export default AniCard;
