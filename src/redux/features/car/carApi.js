import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "https://sello-backend.onrender.com/api";

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Car'],
  endpoints: (builder) => ({
    getFilteredCars: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add all non-empty parameters to the URL
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(item => searchParams.append(key, item));
            } else if (typeof value === 'object') {
              Object.entries(value).forEach(([subKey, subValue]) => {
                if (subValue !== undefined && subValue !== null && subValue !== '') {
                  searchParams.append(`${key}[${subKey}]`, subValue);
                }
              });
            } else {
              searchParams.append(key, value);
            }
          }
        });
        
        return {
          url: `/cars/filter?${searchParams.toString()}`,
          method: 'GET',
        };
      },
      transformResponse: (response) => ({
        cars: response?.data || [],
        total: response?.total || 0,
        page: response?.page || 1,
        pages: response?.pages || 1,
        limit: response?.limit || 12,
      }),
      providesTags: (result) =>
        result?.cars
          ? [
              ...result.cars.map(({ _id }) => ({
                type: 'Car',
                id: _id,
              })),
              { type: 'Car', id: 'LIST' },
            ]
          : [{ type: 'Car', id: 'LIST' }],
    }),
  }),
});

export const { useGetFilteredCarsQuery } = carApi;
