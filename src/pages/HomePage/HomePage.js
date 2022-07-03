import React from 'react'
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

const onClick = (navigate, item) => () => {
  navigate(`/detail/${item.id}`)
}

function HomePage() {
  const navigate = useNavigate();
  const { currentPage, pageChange } = usePagination();
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

  const renderContent = () => (
    <Stack spacing={5}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
        {animeList.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <AniCard item={item} onClick={onClick(navigate, item)} />
          </Grid>
        ))}
      </Grid>
        <Pagination pageInfo={pageInfo} onPageChange={pageChange} page={currentPage} />
    </Stack>
  )

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
      {loading ? <CircularProgress /> : renderContent()}
    </Box>

  )
}

export default HomePage;
