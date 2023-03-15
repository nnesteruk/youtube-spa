import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: JSON.parse(localStorage.getItem('favorites')) || [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.requests.push({ ...action.payload });
    },
    deleteFavorite(state, action) {
      state.requests = state.requests.filter((item) => item.id !== action.payload.id);
    },
    updateFavorite(state, action) {},
  },
});

export const { addFavorite, deleteFavorite, updateFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
