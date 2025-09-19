import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import tagsReducer from './slices/tagsSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
