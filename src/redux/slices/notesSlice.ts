import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  priority: string;
  tags: string[];
  createdAt: string;
  editedAt: string;
}

interface NotesState {
  notes: Note[];
  archived: Note[];
  trash: Note[];
}

const initialState: NotesState = {
  notes: [],
  archived: [],
  trash: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<Note, 'id' | 'pinned' | 'createdAt' | 'editedAt'>>) => {
      const newNote = {
        ...action.payload,
        id: Date.now().toString(),
        pinned: false,
        createdAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
      };
      state.notes.push(newNote);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = {
            ...action.payload,
            editedAt: new Date().toISOString(),
        };
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteToDelete = state.notes.find((note) => note.id === action.payload);
      if (noteToDelete) {
        state.trash.push(noteToDelete);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
    archiveNote: (state, action: PayloadAction<string>) => {
      const noteToArchive = state.notes.find((note) => note.id === action.payload);
      if (noteToArchive) {
        state.archived.push(noteToArchive);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
    unarchiveNote: (state, action: PayloadAction<string>) => {
      const noteToUnarchive = state.archived.find((note) => note.id === action.payload);
      if (noteToUnarchive) {
        state.notes.push(noteToUnarchive);
        state.archived = state.archived.filter((note) => note.id !== action.payload);
      }
    },
    deleteFromTrash: (state, action: PayloadAction<string>) => {
      state.trash = state.trash.filter((note) => note.id !== action.payload);
    },
    restoreFromTrash: (state, action: PayloadAction<string>) => {
      const noteToRestore = state.trash.find((note) => note.id === action.payload);
      if (noteToRestore) {
        state.notes.push(noteToRestore);
        state.trash = state.trash.filter((note) => note.id !== action.payload);
      }
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
      }
    },
    updateNotePriority: (state, action: PayloadAction<{ id: string; priority: string }>) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.priority = action.payload.priority;
      }
    },
    updateNoteTags: (state, action: PayloadAction<{ id: string; tags: string[] }>) => {
      const note = state.notes.find((note) => note.id === action.payload.id);
      if (note) {
        note.tags = action.payload.tags;
      }
    },
  },
});

export const {
  addNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  deleteFromTrash,
  restoreFromTrash,
  togglePin,
  updateNotePriority,
  updateNoteTags,
} = notesSlice.actions;
export default notesSlice.reducer;