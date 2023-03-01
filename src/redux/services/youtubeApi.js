import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SEARCHURL}`,
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem('token');
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      //   api.endpoint()
      // }
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('key', `${process.env.REACT_APP_API_KEY}`);
        headers.set('Access-Control-Allow-Origin', 'no-cors');
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getList: build.query({
      query: () => ({
        url: '/videos',
      }),
    }),
  }),
});

//export const { useGetListQuery } = youtubeApi;
