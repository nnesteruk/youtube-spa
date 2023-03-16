import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: JSON.parse(localStorage.getItem('favorites')) || [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteAction(state, action) {
      state.requests.push({ ...action.payload });
    },
    deleteFavoriteAction(state, action) {
      state.requests = state.requests.filter((item) => item.id !== action.payload.id);
    },
    updateFavoriteAction(state, action) {
      const { id } = action.payload;
      const current = state.requests.find((item) => item.id === id);
      const result = { ...current, ...action.payload };

      // current.request = action.payload.request;
      // current.name = action.payload.name;
      // current.sort = action.payload.sort;
      // current.count = action.payload.count;
    },
  },
});

export const { addFavoriteAction, deleteFavoriteAction, updateFavoriteAction } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
