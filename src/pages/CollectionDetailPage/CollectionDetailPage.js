import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import AniCard from '../../components/Card/AniCard';
import { getAnimeList, updateCollectionList } from '../../utils/collectionUtils';
import { saveToLocalStorage } from '../../utils/localStorage';

function CollectionDetailPage() {
  const { name } = useParams();
  const animeList = getAnimeList(name);
  const [list, setList] = useState(animeList)

  const onRemove = (item) => () => {
    const filteredData = animeList.filter(anime => anime.id !== item.id);
    const result = updateCollectionList(name, filteredData)

    saveToLocalStorage('collections', result);
    setList(filteredData);
  }

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
      {list.map((item, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <AniCard removable item={item} onButtonClick={onRemove(item)} />
        </Grid>
      ))}
    </Grid>
  )
};

export default CollectionDetailPage;