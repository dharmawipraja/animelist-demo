import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { ANIME_DETAIL_QUERY } from '../../graphql/animeQuery';
import { useModal } from '../../hooks/useModal';
import CollectionsModal from '../../components/CollectionsModal/CollectionsModal';
import { getCollectionList } from '../../utils/collectionUtils';
import { mq } from '../../utils/mediaQueriesUtils';
import AniCard from '../../components/Card/AniCard';

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
  const { title, bannerImage, description } = !loading && animeDetail;

  useEffect(() => {
    const list = getCollectionList(collectionList, id);
    const result = [...new Set(list)];

    setCollectionList(result);
    // eslint-disable-next-line
  }, [isShowModal])

  const isCollection = collectionList.length > 0;

  const onAddCollection = () => {
    showModal();
  };

  const renderContent = () => (
    <Stack sx={{ [mq]: { display: 'flex', alignItems: 'center' } }}>
      <Box 
        sx={{
          display: 'flex',
          backgroundImage: `url(${bannerImage})`,
          height: 300,
          [mq]: { height: 0 }
        }}
      />
      <Box sx={{ ml: 50, [mq]: { ml: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' } }}>
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
            borderRadius: 2,
            [mq]: {
              position: 'relative',
              top: 0,
              left: 0,
            }
          }}
        >
          <AniCard notitle item={animeDetail} onButtonClick={onAddCollection} isCollection={isCollection} />
        </Box>
        <Box sx={{ mt: 4, [mq]: { mt: 0 } }}>
          <Typography gutterBottom variant="h4" component="div" el="true" color='#5c728a'>
            {title.romaji}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" el="true" color='#7a858f'>
            {description}
          </Typography>
          <Stack sx={{ mt: 5, [mq]: { display: 'flex', flexWrap: 'wrap' } }} direction="row" spacing={1}>
            {collectionList.map(item => (
              <Chip label={item} variant="outlined" onClick={onCollectionClick(navigate, item)} />
            ))}
          </Stack>
        </Box>
      </Box>
      <CollectionsModal collectionList={collectionList} isOpen={isShowModal} onClose={closeModal} data={animeDetail} />
    </Stack>
    );

  return (
    loading ? <CircularProgress /> : renderContent()
  )
};

export default DetailPage;
