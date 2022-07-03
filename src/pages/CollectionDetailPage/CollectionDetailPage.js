import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AniCard from '../../components/Card/AniCard';
import { getAnimeList, updateCollectionList } from '../../utils/collectionUtils';
import { saveToLocalStorage } from '../../utils/localStorage';

function CollectionDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const animeList = getAnimeList(name);
  const [list, setList] = useState(animeList)

  const onRemove = (item) => () => {
    const filteredData = animeList.filter(anime => anime.id !== item.id);
    const result = updateCollectionList(name, filteredData)

    saveToLocalStorage('collections', result);
    setList(filteredData);
  }

  const onCardClick = (item) => () => {
    navigate(`/detail/${item.id}`)
  }

  return (
    <Stack>
      <Typography gutterBottom variant="h3" component="div" el="true">
        {name}
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
        {list.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <AniCard
              removable item={item}
              onClick={onCardClick(item)}
              onButtonClick={onRemove(item)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
};

export default CollectionDetailPage;