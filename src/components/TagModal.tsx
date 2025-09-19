import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Modal,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { addTag, removeTag } from '../redux/slices/tagsSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

interface TagModalProps {
  open: boolean;
  onClose: () => void;
}

const TagModal = ({ open, onClose }: TagModalProps) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state: any) => state.tags.tags);
  const [newTag, setNewTag] = useState('');

  const handleAddNewTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag === '') {
        return;
    }

    if (!allTags.includes(trimmedTag)) {
      dispatch(addTag(trimmedTag));
    }

    setNewTag('');
  };

  const handleDeleteTag = (tag: string) => {
    dispatch(removeTag(tag));
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Edit Tags</Typography>
            <IconButton onClick={onClose} size="small"><Close /></IconButton>
        </Box>
        <TextField
          placeholder="new tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNewTag()}
          variant="standard"
          fullWidth
        />
        <Box sx={{ maxHeight: 220, overflow: 'auto' }}>
          {allTags.map((tag: string) => (
            <Box
              key={tag}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: '1rem' }}>{tag}</Typography>
              <IconButton onClick={() => handleDeleteTag(tag)} size="small">
                <Close sx={{ color: 'text.secondary' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default TagModal;
