import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const saved = JSON.parse(localStorage.getItem('saved')) || [];

const check = () => {
  const currentUser = saved.find(
    (item) => console.log(item.token.slice(0, item.token.indexOf('.'))) === token,
  );
  return currentUser ? currentUser.data : [];
};

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

    addUsersAction(state, action) {
      const users = JSON.parse(localStorage.getItem('saved')) || [];
      const currentUser = users.find((user) => user.token === token);
      currentUser.data = [...state.requests];
      localStorage.setItem('saved', JSON.stringify([...users]));
    },
  },
});

export const {
  addFavoriteAction,
  deleteFavoriteAction,
  updateFavoriteAction,
  addChoiceAction,
  addUsersAction,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
