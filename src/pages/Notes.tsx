import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import Masonry from 'react-masonry-css';
import NoteCard from '../components/NoteCard';
import SortMenu from '../components/SortMenu';
import type { RootState } from '../redux/store';
import type { Note } from '../redux/slices/notesSlice';
import '../styles/Notes.css';

interface NotesProps {
  selectedCategory: string;
  onEditNote: (note: Note) => void;
}

const Notes = ({ selectedCategory, onEditNote }: NotesProps) => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState('');

  const handleSortMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  const handleClearSort = () => {
    setSortBy('');
    handleSortMenuClose();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const isNotesCategory = selectedCategory.toLowerCase() === 'notes';

  const categoryFilteredNotes = notes.filter(note => {
    if (isNotesCategory) return true;
    return note.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
  });

  const searchFilteredNotes = categoryFilteredNotes.filter(
    (note) =>
      (note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )) 
  );

  const sortedNotes = [...searchFilteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'priority_low_high':
        return a.priority.localeCompare(b.priority);
      case 'priority_high_low':
        return b.priority.localeCompare(a.priority);
      case 'date_latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date_created':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'date_edited':
        return new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime();
      default:
        return 0;
    }
  });

  const pinnedNotes = sortedNotes.filter((note) => note.pinned);
  const otherNotes = sortedNotes.filter((note) => !note.pinned);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <Box>
      {isNotesCategory && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <TextField
            fullWidth
            placeholder="노트의 제목을 입력해주세요."
            value={search}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{
              mr: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
                transition: 'box-shadow .28s cubic-bezier(.4,0,.2,1)',
                '&.Mui-focused': {
                   boxShadow: '0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)',
                },
                '& fieldset': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-input': {
                    padding: '8px 14px',
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSortMenuClick}
            sx={{
              textTransform: 'none',
              backgroundColor: '#fff',
              color: '#3c4043',
              boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
              border: '1px solid transparent',
              '&:hover': {
                backgroundColor: '#f8f9fa',
                boxShadow: '0 1px 3px 0 rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15)',
              },
              borderRadius: '8px',
              padding: '6px 24px',
              whiteSpace: 'nowrap',
              minWidth: 'auto'
            }}
          >
            정렬
          </Button>
          <SortMenu
            anchorEl={anchorEl}
            onClose={handleSortMenuClose}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            onClear={handleClearSort}
          />
        </Box>
      )}
      {pinnedNotes.length > 0 && (
        <Box mb={5}>
          <Typography variant="overline" display="block" sx={{ mb: 2 }}>
            Pinned Notes ({pinnedNotes.length})
          </Typography>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} type="notes" onEdit={() => onEditNote(note)} />
            ))}
          </Masonry>
        </Box>
      )}
      {otherNotes.length > 0 && (
        <Box>
          <Typography variant="overline" display="block" sx={{ mb: 2 }}>
            All Notes ({otherNotes.length})
          </Typography>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {otherNotes.map((note) => (
              <NoteCard key={note.id} note={note} type="notes" onEdit={() => onEditNote(note)} />
            ))}
          </Masonry>
        </Box>
      )}
    </Box>
  );
};

export default Notes;
