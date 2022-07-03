import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiEdit, FiPlusCircle } from 'react-icons/fi';

import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { bannerPlaceholder } from '../../assets/images';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { useModal } from '../../hooks/useModal';
import EditModal from '../../components/EditModal/EditModal';
import { createNewCollection } from '../../utils/collectionUtils';

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
  const { 
    showModal: showEditModal,
    closeModal: closeEditModal,
    isShowModal: isShowEditModal
  } = useModal();
  const { 
    showModal: showCreateModal,
    closeModal: closeCreateModal,
    isShowModal: isShowCreateModal
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
    setCollectionName(name);
    showEditModal();
  };

  const onEditConfirm = (name) => {
    const index = collections.findIndex(item => item.title === collectionName);

    if (index < 0) {
      return;
    };

    collections[index].title = name;

    saveToLocalStorage('collections', collections);
    setList(collections);
    closeEditModal();
  };

  const onCreateNew = () => {
    showCreateModal();
  }

  const onCreateConfirm = (name) => {
    const result = createNewCollection(collections, name);

    saveToLocalStorage('collections', result);
    setList(result);
    closeCreateModal();

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
      <Stack spacing={5}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onCreateNew} variant='outlined' sx={{ width: '20%' }} startIcon={<FiPlusCircle />}>
            Create New Collection
          </Button>
        </Box>
        {list.map(item => renderContent(item))}
      </Stack>
      <ConfirmationModal
        isOpen={isShowConfirmationModal}
        onClose={closeConfirmationModal}
        title="Delete ?"
        subtitle="Are you sure you want to delete this collection ?"
        onConfirm={onDeleteConfirm}
      />
      <EditModal
        title={collectionName}
        isOpen={isShowEditModal}
        onClose={closeEditModal}
        onSubmit={onEditConfirm}
      />
      <EditModal
        isOpen={isShowCreateModal}
        onClose={closeCreateModal}
        isCreate
        onSubmit={onCreateConfirm}
      />
    </Box>
  )
};

export default CollectionsPage;