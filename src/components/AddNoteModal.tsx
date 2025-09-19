import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { addNote } from '../redux/slices/notesSlice';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddNoteModal = ({ open, onClose }: AddNoteModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [priority, setPriority] = useState('low');

  const handleAddNote = () => {
    if (title.trim() === '' && content.trim() === '') return;
    dispatch(addNote({ title, content, tags, color, priority }));
    setTitle('');
    setContent('');
    setTags([]);
    setColor('#ffffff');
    setPriority('low');
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-note-modal-title"
    >
      <Box sx={style}>
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{position: 'absolute', right: 8, top: 8}}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="add-note-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
          Create a New Note
        </Typography>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
                <TextField
                    label="Add a tag"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddTag()}
                />
                <IconButton onClick={handleAddTag}><AddIcon /></IconButton>
            </Box>
            <TextField
                label="Background Color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                sx={{ width: '150px' }}
            />
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                    value={priority}
                    label="Priority"
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value={'low'}>Low</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'high'}>High</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box sx={{display: 'flex', gap: 1, mt: 1, mb: 2}}>
            {tags.map(tag => (
                <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
            ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default AddNoteModal;
