import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const pass = `Valantis_${stamp}`
const md5pass = md5(pass)

export const productsApi = createApi({
  reducerPath: 'productsApi',
  // tagTypes: ['Products'],
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: 'https://api.valantis.store:41000/',
      prepareHeaders: (headers) => {
        headers.set('X-Auth', md5pass)
      },
    }),
    { maxRetries: 1 }
  ),
  endpoints: (build) => ({
    getProducts: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_items', params },
      }),
    }),
    getIds: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
      // invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getFilteredIds: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'filter', params },
      }),
    }),
  }),
})

export const {
  useGetProductsMutation,
  useGetIdsMutation,
  useGetFilteredIdsMutation,
} = productsApi
