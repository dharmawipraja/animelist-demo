import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MUIModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import { useForm } from 'react-hook-form';

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
  p: 4
};

const watchedValue = (watch) => {
  const collectionName = watch('collectionNameForm');

  return {
    collectionName
  };
};

function EditModal({ title, isOpen, onClose, onSubmit }) {
  const { register, watch, reset } = useForm();
  const { collectionName } = watchedValue(watch)

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const renderAddCollection = () => (
    <form>
      <TextField
        {...register("collectionNameForm", { required: true })}
        id="outlined-basic" 
        label="Collection Name"
        variant="outlined" 
        sx={{ width: '90%' }}
        defaultValue={title}
      />
    </form>

  )

  const onSubmitButton = (onSubmit) => () => {
    onSubmit(collectionName)
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
                Edit Collection Name
              </Typography>
              {renderAddCollection()}
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
              <Button variant="contained" onClick={onSubmitButton(onSubmit)}>Submit</Button>
            </Box>
          </Box>
        </Fade>
      </MUIModal>
    </div>
  );
}

export default EditModal;
