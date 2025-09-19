
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addTag as addTagToStore } from '../redux/slices/tagsSlice';
import { RootState } from '../redux/store';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

interface AddTagModalProps {
  open: boolean;
  onClose: () => void;
  noteTags: string[];
  onToggleTag: (tag: string) => void;
}

const AddTagModal: React.FC<AddTagModalProps> = ({ open, onClose, noteTags, onToggleTag }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state: RootState) => state.tags.tags);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      dispatch(addTagToStore(newTag.trim()));
    }
    setNewTag('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag();
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-tag-modal-title"
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="add-tag-modal-title" variant="h6" component="h2">
            ADD Tags
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="baseline" mt={2} gap={1}>
          <TextField
            label="new tag..."
            variant="standard"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ flexGrow: 1 }}
          />
          <Button onClick={handleAddTag} disabled={!newTag.trim()} size="small">Add</Button>
        </Box>
        <List sx={{ mt: 2, maxHeight: 200, overflow: 'auto' }}>
          {allTags.map((tag) => (
            <ListItem key={tag} dense>
              <ListItemText primary={tag} />
              <IconButton edge="end" onClick={() => onToggleTag(tag)}>
                {noteTags.includes(tag) ? <RemoveIcon /> : <AddIcon />}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default AddTagModal;
