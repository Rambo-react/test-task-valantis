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
    getItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_items', params },
      }),
    }),
    getIdItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
      // invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getFilteredIdList: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'filter', params },
      }),
    }),
    getFields: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_fields', params },
      }),
    }),
  }),
})

export const {
  useGetItemsMutation,
  useGetIdItemsMutation,
  useGetFilteredIdListMutation,
  useGetFieldsMutation,
} = productsApi
