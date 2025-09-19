import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { addNote, updateNote } from '../redux/slices/notesSlice';
import type { Note } from '../redux/slices/notesSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/NoteModal.css';
import AddTagModal from './AddTagModal';

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  noteToEdit: Note | null;
}

const quillModules = {
  toolbar: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    ['image', 'blockquote', 'code-block'],
  ],
};

const NoteModal = ({ open, onClose, noteToEdit }: NoteModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('White');
  const [priority, setPriority] = useState('Low');
  const [tags, setTags] = useState<string[]>([]);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setColor(noteToEdit.color);
      setPriority(noteToEdit.priority);
      setTags(noteToEdit.tags);
    } else {
      setTitle('');
      setContent('');
      setColor('White');
      setPriority('Low');
      setTags([]);
    }
  }, [noteToEdit, open]);

  const handleSave = () => {
    if (noteToEdit) {
      dispatch(updateNote({ ...noteToEdit, title, content, color, priority, tags }));
    } else {
      dispatch(addNote({ title, content, color, priority, tags }));
    }
    onClose();
  };

  const handleToggleTag = (tag: string) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ p: 3, flexShrink: 0 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {noteToEdit ? '노트 수정하기' : '노트 생성하기'}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', px: 3 }}>
            <TextField
              fullWidth
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box className="quill-wrapper">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                placeholder="내용을 입력하세요..."
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2, mb: 1, minHeight: '32px' }}>
              {tags.map((tag) => <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />)}
            </Box>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1, mb: 2 }}>
                <Grid item>
                    <Button onClick={() => setIsAddTagModalOpen(true)} variant="outlined" sx={{ textTransform: 'none', color: '#5f6368', borderColor: '#dadce0', bgcolor: '#f8f9fa', '&:hover': { backgroundColor: '#f1f3f4', borderColor: '#c6c6c6'} }}>
                        Add Tag
                    </Button>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{whiteSpace: 'nowrap', color: '#5f6368'}}>배경색 :</Typography>
                        <Select size="small" value={color} onChange={(e: SelectChangeEvent) => setColor(e.target.value)} sx={{ minWidth: 100 }}>
                            <MenuItem value="White">White</MenuItem>
                            <MenuItem value="#f28b82">Red</MenuItem>
                            <MenuItem value="#fbbc04">Orange</MenuItem>
                            <MenuItem value="#fff475">Yellow</MenuItem>
                            <MenuItem value="#ccff90">Green</MenuItem>
                            <MenuItem value="#a7ffeb">Teal</MenuItem>
                            <MenuItem value="#cbf0f8">Blue</MenuItem>
                            <MenuItem value="#aecbfa">Dark Blue</MenuItem>
                            <MenuItem value="#d7aefb">Purple</MenuItem>
                            <MenuItem value="#fdcfe8">Pink</MenuItem>
                            <MenuItem value="#e6c9a8">Brown</MenuItem>
                            <MenuItem value="#e8eaed">Gray</MenuItem>
                        </Select>
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{whiteSpace: 'nowrap', color: '#5f6368'}}>우선순위 :</Typography>
                        <Select size="small" value={priority} onChange={(e: SelectChangeEvent) => setPriority(e.target.value)} sx={{ minWidth: 100 }}>
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
        <Box sx={{ p: 3, pt: 2, display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
            <Button onClick={handleSave} variant="contained" startIcon={<Add />} sx={{ backgroundColor: '#feeec8', color: '#202124', boxShadow: 'none', textTransform: 'none', fontWeight: '500', '&:hover': { backgroundColor: '#fddc9c', boxShadow: 'none'} }}>
                {noteToEdit ? '수정하기' : '생성하기'}
            </Button>
        </Box>

        <AddTagModal
          open={isAddTagModalOpen}
          onClose={() => setIsAddTagModalOpen(false)}
          noteTags={tags}
          onToggleTag={handleToggleTag}
        />
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(650px, 70vw, 900px)',
  maxHeight: '85vh',
  bgcolor: '#fff',
  border: '1px solid #dadce0',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
  display: 'flex',
  flexDirection: 'column'
};

export default NoteModal;
