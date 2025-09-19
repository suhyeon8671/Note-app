import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import NoteCard from '../components/NoteCard';
import type { RootState } from '../redux/store';

const Trash = () => {
  const { trash } = useSelector((state: RootState) => state.notes);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Trash
      </Typography>
      <Grid container spacing={3}>
        {trash.map((note) => (
          <Grid item key={note.id} xs={12} sm={6} md={4}>
            <NoteCard note={note} type="trash" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Trash;
