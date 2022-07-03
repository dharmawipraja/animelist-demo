import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import AniCard from '../../components/Card/AniCard';
import { ANIME_LIST_QUERY } from '../../graphql/animeQuery';

const onClick = (navigate, item) => () => {
  navigate(`/detail/${item.id}`)
}

function HomePage() {
  const navigate = useNavigate();
  const { data, loading } = useQuery(
    ANIME_LIST_QUERY, {
      variables: {
        page: 1,
        perPage: 10
      }
    }
  );
  const animeList = data?.Page?.media;

  const renderContent = () => (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
      {animeList.map((item, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <AniCard item={item} onClick={onClick(navigate, item)} />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading ? <CircularProgress /> : renderContent()}
    </Box>

  )
}

export default HomePage;
