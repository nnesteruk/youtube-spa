import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SEARCHURL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        // headers.set('Authorization', `Bearer ${token}`);
        headers.set('Accept', 'application/json');
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getList: build.query({
      query: (searchText = '', limit = 12) => ({
        url: '/search',
        params: {
          key: `${process.env.REACT_APP_API_KEY}`,
          part: 'snippet',
          maxResults: limit,
          // q: searchText,
        },
      }),
    }),
  }),
});
//youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=date&q=%D0%9A%D0%B0%D0%BA%20%D0%B7%D0%B0%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D1%82%D1%8C&key=[YOUR_API_KEY]

//export const { useGetListQuery } = youtubeApi;
