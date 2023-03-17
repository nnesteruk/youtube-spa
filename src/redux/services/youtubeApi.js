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
        // headers.set('cors', 'no-cors');
        headers.set('key', `${process.env.REACT_APP_API_KEY}`);
        console.log(headers.get('key'));
      }
      console.log(process.env.REACT_APP_API_KEY);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getList: build.query({
      query: () => ({
        url: '/search',
      }),
    }),
  }),
});

//export const { useGetListQuery } = youtubeApi;
