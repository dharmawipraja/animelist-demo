import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, Typography, Box, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { bannerPlaceholder } from '../../assets/images';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../hooks/useModal';

function CollectionsPage() {
  const collections = getFromLocalStorage('collections');
  const [list, setList] = useState(collections);
  const [collectionName, setCollectionName] = useState('');
  const navigate = useNavigate();
  const { 
    showModal: showConfirmationModal,
    closeModal: closeConfirmationModal,
    isShowModal: isShowConfirmationModal
  } = useModal();

  const onCardClick = (name) => () => {
    navigate(`/collection/${name}`)
  };

  const onDelete = (name) => () => {
    setCollectionName(name);
    showConfirmationModal();
  };

  const onDeleteConfirm = () => {
    const filteredData = collections.filter(item => item.title !== collectionName);

    saveToLocalStorage('collections', filteredData);

    setList(filteredData);
    closeConfirmationModal();
  }

  const onEdit = (name) => () => {
    console.log('edit', name)
    // const index = collections.findIndex(item => item.title === collectionName);

    // if (index < 0) {
    //   return;
    // };

    // collections[index].title = collections
    // console.log()
  };

  const renderContent = (item) => {
    const { title, animeList } = item;
    const image = animeList[0]?.bannerImage || bannerPlaceholder;
    
    return (
      <Card sx={{ mb: 5 }}>
        <CardActionArea onClick={onCardClick(title)} >
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={title}
          />
        </CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box onClick={onCardClick(title)} sx={{ flex: 3, cursor: 'pointer' }}>
              <Typography gutterBottom variant="h3" component="div" el="true" noWrap>
                {title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
              <Button onClick={onEdit(title)} variant="contained" size="small" color="success" sx={{ height: 50, px: 5 }} startIcon={<FiEdit size={18} />} >
                <Typography>
                  Edit
                </Typography>
              </Button>
              <Button onClick={onDelete(title)} variant="contained" size="small" color="error" sx={{ height: 50, px: 3 }} startIcon={<FiTrash2 size={18} />} >
                <Typography>
                  Delete
                </Typography>
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  };

  return (
    <Box>
      {list.map(item => renderContent(item))}
      <ConfirmationModal
        isOpen={isShowConfirmationModal}
        onClose={closeConfirmationModal}
        title="Delete ?"
        subtitle="Are you sure you want to delete this collection ?"
        onConfirm={onDeleteConfirm}
      />
    </Box>
  )
};

export default CollectionsPage;
