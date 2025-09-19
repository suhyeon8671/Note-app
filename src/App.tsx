import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  CircularProgress,
  Toolbar
} from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteModal from './components/NoteModal';
import TagModal from './components/TagModal';
import type { Note } from './redux/slices/notesSlice';

const drawerWidth = 240;

const Notes = lazy(() => import('./pages/Notes'));
const Archive = lazy(() => import('./pages/Archive'));
const Trash = lazy(() => import('./pages/Trash'));
const Reminders = lazy(() => import('./pages/Reminders'));

function App() {
  const [currentCategory, setCurrentCategory] = useState('Notes');
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleOpenNoteModal = (note: Note | null = null) => {
    setNoteToEdit(note);
    setNoteModalOpen(true);
  };

  const handleCloseNoteModal = () => {
    setNoteToEdit(null);
    setNoteModalOpen(false);
  };

  const handleOpenTagModal = () => {
    setTagModalOpen(true);
  };

  const handleCloseTagModal = () => {
    setTagModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header title={currentCategory} onAddNote={() => handleOpenNoteModal()} />
      <Sidebar
        drawerWidth={drawerWidth}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        onEditTags={handleOpenTagModal}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Notes selectedCategory={currentCategory} onEditNote={handleOpenNoteModal} />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </Suspense>
      </Box>
      <NoteModal
        open={noteModalOpen}
        onClose={handleCloseNoteModal}
        noteToEdit={noteToEdit}
      />
      <TagModal
        open={tagModalOpen}
        onClose={handleCloseTagModal}
      />
    </Box>
  );
}

export default App;
