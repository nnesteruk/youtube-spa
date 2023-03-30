import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const favorites = JSON.parse(localStorage.getItem('favorites'));
const saved = favorites?.find((item) => item.token === token);

const check = () => {
  if (saved) {
    const { data } = saved;
    return data;
  }
  return null;
};

const initialState = {
  requests: check() || [],
  choice: null,
  user: { token, data: [] },
  users: favorites || [],
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
      state.user.data = state.requests;
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

      // localStorage.setItem(
      //   'favorites',
      //   JSON.stringify({ token: localStorage.getItem('token'), data: state.requests }),
      // );
    },

    addChoiceAction(state, action) {
      state.choice = { ...action.payload };
    },

    addUsersAction(state, action) {
      const currentUser = state.users.find((item) => item.token === action.payload.token);
      if (!currentUser) {
        state.users.push({ ...action.payload });
      }
      localStorage.setItem('favorites', JSON.stringify(state.users));
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
