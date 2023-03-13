import { configureStore } from '@reduxjs/toolkit';
import { youtubeApi } from './services/youtubeApi';
import favReducer from './favorite/slice';

export const store = configureStore({
  reducer: {
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    favorites: favReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(youtubeApi.middleware);
  },
});
