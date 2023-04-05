import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const saved = JSON.parse(localStorage.getItem('saved')) || [];

const check = () => {
  const currentUser = saved.find((item) => item.token === token.slice(0, token.indexOf('.'))); //? для пользователей (через массив)
  return currentUser ? currentUser.data : [];
};

// const check = () => {
// const currentUser = saved.find((item) => item.token === token.slice(0, token.indexOf('.')));
// return saved.token === token.slice(0, token.indexOf('.')) ? saved.data : []; //? для пользователей (через объект)
// };

const initialState = {
  requests: check(),
  choice: null,
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteAction(state, action) {
      const current = state.requests.find((item) => item.name === action.payload.name);
      if (current) {
        throw new Error(
          alert('Запрос с таким названием уже сохранён. Пожалуйста выберите другое название'),
        );
      }
      state.requests.push({ ...action.payload });
    },
    deleteFavoriteAction(state, action) {
      state.requests = state.requests.filter((item) => item.id !== action.payload.id);
    },
    updateFavoriteAction(state, action) {
      const { id } = action.payload;
      const current = state.requests.find((item) => item.id === id);
      current.request = action.payload.request;
      current.name = action.payload.name;
      current.sort = action.payload.sort;
      current.count = action.payload.count;
    },

    addChoiceAction(state, action) {
      state.choice = { ...action.payload };
    },

    clearRequestAction(state, action) {
      state.requests = [];
      state.choice = null;
    },
  },
});

export const {
  addFavoriteAction,
  deleteFavoriteAction,
  updateFavoriteAction,
  addChoiceAction,
  clearRequestAction,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
