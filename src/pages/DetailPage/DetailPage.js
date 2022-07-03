import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button  from '@mui/material/Button';
import { FiHeart } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ANIME_DETAIL_QUERY } from '../../graphql/animeQuery';

function DetailPage() {
  const { id } = useParams();
  const { data, loading } = useQuery(
    ANIME_DETAIL_QUERY, {
      variables: {
        id
      }
    }
  );
  const animeDetail = data?.Media;
  const { title, coverImage, bannerImage, description } = !loading && animeDetail;

  // TO DO: get collection from storage
  const isCollection = false;
  const color = isCollection ? 'red' : '#5c728a';
  const fill = isCollection ? 'red' : 'transparent';

  const renderContent = () => (
    <Stack>
      <Box 
        sx={{
          display: 'flex',
          backgroundImage: `url(${bannerImage})`,
          height: 300
        }}
      />
      <Box sx={{ marginLeft: 50 }}>
        <Box
          sx={{
            height: 400,
            width: 250,
            position: 'absolute',
            top: 330,
            left: 200,
            borderStyle: 'solid',
            borderWidth: 'medium',
            borderColor: '#fff',
            borderRadius: 2
          }}
        >
          <Card>
              <CardMedia
                component="img"
                height="400"
                image={coverImage.large}
                alt={title.romaji}
              />
            <CardActions>
              <Button size="medium" color="primary">
                <Typography sx={{ fontSize: 14, marginRight: 4, color: '#5c728a' }}>
                  Add To Collections
                </Typography>
                <FiHeart size={18} color={color} fill={fill} />
              </Button>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography gutterBottom variant="h4" component="div" el="true" color='#5c728a'>
            {title.romaji}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" el="true" color='#7a858f'>
            {description}
          </Typography>
        </Box>
      </Box>
    </Stack>
    );

  return (
    loading ? <CircularProgress /> : renderContent()
  )
};

export default DetailPage;
