import { createSlice } from '@reduxjs/toolkit';

// const token = localStorage.getItem('token');
// const check = () => {
//   const token2 = JSON.parse(localStorage.getItem('favorites'));
//   if (token === token2?.token) {
//     return token2?.data;
//   }
//   return null;
// };

const initialState = {
  requests: JSON.parse(localStorage.getItem('favorites')) || [],
  choice: null,
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addChoiceAction(state, action) {
      state.choice = { ...action.payload };
    },
    addFavoriteAction(state, action) {
      const current = state.requests.find((item) => item.name === action.payload.name);
      if (current) {
        throw new Error(
          alert('Запрос с таким названием уже сохранён. Пожалуйста выберите другое название'),
        );
      }
      state.requests.push({ ...action.payload });
      localStorage.setItem('favorites', JSON.stringify(state.requests));
    },
    deleteFavoriteAction(state, action) {
      state.requests = state.requests.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.requests));
      console.log('delete');
    },
    updateFavoriteAction(state, action) {
      const { id } = action.payload;
      const current = state.requests.find((item) => item.id === id);
      // state.requests = { ...current, ...action.payload };

      current.request = action.payload.request;
      current.name = action.payload.name;
      current.sort = action.payload.sort;
      current.count = action.payload.count;
      localStorage.setItem('favorites', JSON.stringify(state.requests));
    },
  },
});

export const { addFavoriteAction, deleteFavoriteAction, updateFavoriteAction, addChoiceAction } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
