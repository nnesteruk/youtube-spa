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
      query: (arg) => {
        const { searchText, limit, order } = arg;
        return {
          // url: `/search?part=snippet${limit && `&maxResults=${limit}`}${
          //   order && `&order=${order}`
          // }${searchText && `&q=${searchText}`}&key=${process.env.REACT_APP_API_KEY} `,
          url: `/search`,
          params: {
            key: `${process.env.REACT_APP_API_KEY}`,
            part: 'snippet',
            maxResults: limit,
            q: searchText,
            order,
          },
        };
      },
    }),
  }),
});

//export const { useGetListQuery } = youtubeApi;
