import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import TagModal from '../components/TagModal';

const EditNotes = () => {
  const [isTagModalOpen, setTagModalOpen] = useState(false);

  return (
    <Box>
      <Typography variant="h4">Edit Notes</Typography>
      <Button variant="contained" onClick={() => setTagModalOpen(true)}>
        Edit Tags
      </Button>
      <TagModal open={isTagModalOpen} onClose={() => setTagModalOpen(false)} />
    </Box>
  );
};

export default EditNotes;
