import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: ['видео', '1234', 'card'],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.requests.push({ ...action.payload });
    },
  },
});

export const { addFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
