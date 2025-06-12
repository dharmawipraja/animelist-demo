import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AniCard from '../../components/Card/AniCard';
import { getAnimeList, updateCollectionList } from '../../utils/collectionUtils';
import { saveToLocalStorage } from '../../utils/localStorage';
import { useModal } from '../../hooks/useModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { useToasts } from '../../context/Toast/ToastContext';

function CollectionDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToasts();
  const { isShowModal, showModal, closeModal } = useModal();
  const animeList = getAnimeList(name);
  const [list, setList] = useState(animeList)
  const [animeId, setAnimeId] = useState()

  const onRemoveConfirm = () => {
    const filteredData = animeList.filter(anime => anime.id !== animeId);
    const result = updateCollectionList(name, filteredData);

    saveToLocalStorage('collections', result);
    setList(filteredData);
    closeModal();
    showToast("Anime removed from collection");
  }

  const onRemove = (item) => () => {
    setAnimeId(item.id)
    showModal()
  }

  const onCardClick = (item) => () => {
    navigate(`/detail/${item.id}`);
  };

  return (
    <Box>
      <Stack>
        <Typography gutterBottom variant="h3" component="div" el="true">
          {name}
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 20 }}>
          {list.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <AniCard
                removable item={item}
                onCardClick={onCardClick(item)}
                onButtonClick={onRemove(item)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <ConfirmationModal
        isOpen={isShowModal}
        onClose={closeModal}
        title="Remove ?"
        subtitle="Are you sure you want to remove this anime from collection ?"
        onConfirm={onRemoveConfirm}
      />
    </Box>
  )
};

export default CollectionDetailPage;
