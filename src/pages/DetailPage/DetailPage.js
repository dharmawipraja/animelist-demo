import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button  from '@mui/material/Button';
import { FiHeart } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ANIME_DETAIL_QUERY } from '../../graphql/animeQuery';
import { useModal } from '../../hooks/useModal';
import CollectionsModal from '../../components/CollectionsModal/CollectionsModal';
import { getCollectionList } from '../../utils/collectionUtils';

const onCollectionClick = (navigate, name) => () => {
  navigate(`/collection/${name}`)
}

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isShowModal, showModal, closeModal } = useModal();
  const [collectionList, setCollectionList] = useState([])
  const { data, loading } = useQuery(
    ANIME_DETAIL_QUERY, {
      variables: {
        id
      }
    }
  );
  const animeDetail = data?.Media;
  const { title, coverImage, bannerImage, description } = !loading && animeDetail;

  useEffect(() => {
    const list = getCollectionList(collectionList, id);
    const result = [...new Set(list)];

    setCollectionList(result);
    // eslint-disable-next-line
  }, [isShowModal])

  const isCollection = collectionList.length > 0;
  const color = isCollection ? 'red' : '#5c728a';
  const fill = isCollection ? 'red' : 'transparent';

  const onAddCollection = () => {
    showModal();
  };

  const renderContent = () => (
    <Stack>
      <Box 
        sx={{
          display: 'flex',
          backgroundImage: `url(${bannerImage})`,
          height: 300
        }}
      />
      <Box sx={{ ml: 50 }}>
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
              <Button size="medium" color="primary" onClick={onAddCollection}>
                <Typography sx={{ fontSize: 14, mr: 4, color: '#5c728a' }}>
                  Add To Collections
                </Typography>
                <FiHeart size={18} color={color} fill={fill} />
              </Button>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography gutterBottom variant="h4" component="div" el="true" color='#5c728a'>
            {title.romaji}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" el="true" color='#7a858f'>
            {description}
          </Typography>
          <Stack sx={{ mt: 10 }} direction="row" spacing={1}>
            {collectionList.map(item => (
              <Chip label={item} variant="outlined" onClick={onCollectionClick(navigate, item)} />
            ))}
          </Stack>
        </Box>
      </Box>
      <CollectionsModal isOpen={isShowModal} onClose={closeModal} data={animeDetail} />
    </Stack>
    );

  return (
    loading ? <CircularProgress /> : renderContent()
  )
};

export default DetailPage;
