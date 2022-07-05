import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import AniCard from '../../components/Card/AniCard';
import { ANIME_LIST_QUERY } from '../../graphql/animeQuery';
import Pagination from '../../components/Pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { useModal } from '../../hooks/useModal';
import CollectionsModal from '../../components/CollectionsModal/CollectionsModal';
import { getCollectionList } from '../../utils/collectionUtils';

const onClick = (navigate, item) => () => {
  navigate(`/detail/${item.id}`)
}

function HomePage() {
  const collections = getFromLocalStorage('collections');
  
  useEffect(() => {
    if (!Array.isArray(collections)) {
      saveToLocalStorage('collections', [])
    };
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const [animeDetail, setAnimeDetail] = useState();
  const { currentPage, pageChange } = usePagination();
  const { isShowModal, showModal, closeModal } = useModal();
  const { data, loading } = useQuery(
    ANIME_LIST_QUERY, {
      variables: {
        page: currentPage,
        perPage: 10
      }
    }
  );
  const animeList = data?.Page?.media;
  const pageInfo = data?.Page?.pageInfo;

  const onButtonClick = (id) => {
    const animeDetail = animeList.find(item => item.id === id);
    
    setAnimeDetail(animeDetail);
    showModal();
  };

  const renderItem = (item, index) => {
    const list = getCollectionList([], item?.id);
    const result = [...new Set(list)];
    const isCollection = result.length > 0;

    return (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <AniCard item={item} onCardClick={onClick(navigate, item)} onButtonClick={onButtonClick} isCollection={isCollection} />
      </Grid>
    );
  };

  const renderContent = () => (
    <Stack spacing={5}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
        {animeList.map((item, index) => renderItem(item, index))}
      </Grid>
      <Pagination pageInfo={pageInfo} onPageChange={pageChange} page={currentPage} />
      <CollectionsModal collectionList={animeList} isOpen={isShowModal} onClose={closeModal} data={animeDetail} />
    </Stack>
  )

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
      {loading ? <CircularProgress /> : renderContent()}
    </Box>

  )
}

export default HomePage;
