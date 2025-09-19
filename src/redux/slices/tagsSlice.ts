import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagsState {
  tags: string[];
}

const initialState: TagsState = {
  tags: ['Coding', 'Exercise', 'Quotes'], // Add initial tags
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
  },
});

export const { addTag, removeTag } = tagsSlice.actions;
export default tagsSlice.reducer;