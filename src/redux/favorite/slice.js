import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const favorites = JSON.parse(localStorage.getItem('favorites'));
const saved = favorites?.find((item) => item.token === token);

const check = () => {
  if (saved) {
    const { data } = saved;
    console.log(data);
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
      state.user.data.push({ ...action.payload });
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

    addUserAction(state, action) {
      state.user.push();
    },
  },
});

export const { addFavoriteAction, deleteFavoriteAction, updateFavoriteAction, addChoiceAction } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
