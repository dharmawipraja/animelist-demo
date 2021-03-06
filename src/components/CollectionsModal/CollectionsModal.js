import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { useForm } from 'react-hook-form';
import { FiPlusCircle, FiSave } from "react-icons/fi";

import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { addCollectionList, createNewCollection } from '../../utils/collectionUtils';
import { isButtonDisabled, validateCollectionNameForm } from '../../utils/inputValidation';
import { mq } from '../../utils/mediaQueriesUtils';
import { useToasts } from '../../context/Toast/ToastContext';

const style = {
  position: 'absolute',
  overflow: 'scroll',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '60%',
  bgcolor: 'background.paper',
  border: '1px solid #d3d3d3',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  [mq]: { width: '80%', p: 2 }
};

const watchedValue = (watch) => {
  const collectionName = watch('collectionName');
  const collectionCheck = watch('collectionCheck');

  return {
    collectionName,
    collectionCheck
  };
};

function CollectionsModal({ data, isOpen, onClose, collectionList }) {
  const collections = getFromLocalStorage('collections');
  const [createCollection, setCreateCollection] = useState(false);
  const { showToast } = useToasts();
  const { reset, register, watch, setError, formState: { errors } } = useForm();
  const { collectionName, collectionCheck } = watchedValue(watch);
  const isDisabled = isButtonDisabled('', collectionName);
  const isCollectionsExist = collectionCheck && collectionCheck.length > 0;

  useEffect(() => {
    reset();
  }, [createCollection, isOpen, reset]);

  const onCreateCollection = () => {
    validateCollectionNameForm('collectionNameForm', collectionName, setError);

    if (errors['collectionNameForm']?.message) {
      return;
    }

    const result = createNewCollection(collections, collectionName)

    saveToLocalStorage('collections', result);
    setCreateCollection(false);
  }

  const renderAddCollection = () => (
    <form>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
          <TextField
            {...register("collectionName", { required: true })}
            id="outlined-basic" 
            label="Collection Name" 
            variant="outlined" 
            sx={{ width: '90%' }}
          />
          <FiSave
            size={28}
            onClick={onCreateCollection}
            style={{
              marginLeft: 10,
              cursor: 'pointer',
              pointerEvents: isDisabled ? 'none' : 'auto'
            }}
            color={isDisabled && "#D3D3D3"}
          />
        </Box>
        <Box>
          <FormHelperText sx={{ color: 'red' }}>{errors["collectionNameForm"]?.message}</FormHelperText>
        </Box>
      </Box>
    </form>

  )

  const renderCollectionList = () => (
    collections.map((item) => {
      const isChecked = collectionList.includes(item.title)

      return (
        <form key={item.id}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography key={item.id}>
              {item.title}
            </Typography>
            <input
              key={item.id}
              type="checkbox"
              value={item.title}
              disabled={isChecked}
              {...register("collectionCheck")}
            />
          </Box>
        </form>
      )
    })
  );

  const onSubmitButton = () => {
    const result = addCollectionList(collections, collectionCheck, data)

    saveToLocalStorage('collections', result);
    onClose();
    showToast("Anime added to collections");
  };

  return (
    <div>
      <MUIModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <Stack spacing={3} sx={{ height: '90%'}} >
              <Typography id="transition-modal-title" variant="h5" component="h2">
                Add To Collections
              </Typography>
              {collections.length > 0 && renderCollectionList()}
              {createCollection && renderAddCollection()}
                <Button size="medium" color="primary" onClick={() => setCreateCollection(!createCollection)}>
                  <FiPlusCircle size={18} />
                  <Typography sx={{ fontSize: 14, ml: 1, color: '#5c728a' }}>
                    {createCollection ? 'Cancel' : 'Create New Collection'}
                  </Typography>
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 5 }} >
                  <Button variant="contained" onClick={onSubmitButton} disabled={!isCollectionsExist} >Submit</Button>
                </Box>
            </Stack>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
}

export default CollectionsModal;
