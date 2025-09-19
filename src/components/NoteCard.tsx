import React from 'react';
import DOMPurify from 'dompurify';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  DeleteOutline,
  PushPinOutlined,
  PushPin,
  ArchiveOutlined,
  UnarchiveOutlined,
  EditOutlined,
  RestoreFromTrashOutlined,
} from '@mui/icons-material';
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
  deleteFromTrash,
  restoreFromTrash,
  togglePin,
} from '../redux/slices/notesSlice';
import { motion } from 'framer-motion';
import type { Note } from '../redux/slices/notesSlice';

interface NoteCardProps {
  note: Note;
  type: 'notes' | 'archive' | 'trash';
  onEdit?: () => void;
}

const NoteCard = ({ note, type, onEdit }: NoteCardProps) => {
  const dispatch = useDispatch();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  const renderActions = () => {
    switch (type) {
      case 'notes':
        return (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditClick} size="small"><EditOutlined fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Archive">
              <IconButton onClick={(e) => {e.stopPropagation(); dispatch(archiveNote(note.id))}} size="small"><ArchiveOutlined fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => {e.stopPropagation(); dispatch(deleteNote(note.id))}} size="small"><DeleteOutline fontSize="small" /></IconButton>
            </Tooltip>
          </>
        );
      case 'archive':
        return (
          <>
            <Tooltip title="Unarchive">
              <IconButton onClick={() => dispatch(unarchiveNote(note.id))} size="small"><UnarchiveOutlined fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => dispatch(deleteNote(note.id))} size="small"><DeleteOutline fontSize="small" /></IconButton>
            </Tooltip>
          </>
        );
      case 'trash':
        return (
          <>
            <Tooltip title="Restore">
                <IconButton onClick={() => dispatch(restoreFromTrash(note.id))} size="small"><RestoreFromTrashOutlined fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Delete Permanently">
                <IconButton onClick={() => dispatch(deleteFromTrash(note.id))} size="small"><DeleteOutline fontSize="small" /></IconButton>
            </Tooltip>
          </>
        );
      default:
        return null;
    }
  };

  const sanitizedContent = DOMPurify.sanitize(note.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          backgroundColor: note.color,
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'box-shadow .3s cubic-bezier(.25,.8,.25,1)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
          }
        }}
      >
        <CardContent sx={{pb: 1}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', pr: 1 }}>
              {note.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {note.priority && note.priority !== 'low' && (
                  <Chip label={note.priority.toUpperCase()} size="small" variant="outlined" sx={{mr: 1, fontSize: '0.65rem'}}/>
              )}
              {type !== 'trash' && (
                <Tooltip title={note.pinned ? 'Unpin' : 'Pin'}>
                  <IconButton size="small" onClick={(e) => {e.stopPropagation(); dispatch(togglePin(note.id))}}>
                    {note.pinned ? <PushPin fontSize="small"/> : <PushPinOutlined fontSize="small" />}
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            sx={{ mb: 2, color: 'text.secondary', textAlign: 'left' }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {note.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{borderRadius: '4px', fontSize: '0.7rem'}} />
            ))}
          </Box>
        </CardContent>
        <Box sx={{ px: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(note.createdAt).toLocaleDateString()}
          </Typography>
          <Box>
            {renderActions()}
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default NoteCard;
