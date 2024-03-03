import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const pass = `Valantis_${stamp}`
const md5pass = md5(pass)

/**
 * You can view the documentation for the API using the link below.
 * @see {@link https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md}.
 */

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
    getIdItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
    }),
    getItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_items', params },
      }),
    }),
    getFields: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_fields', params },
      }),
    }),
    getFilteredIdList: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'filter', params },
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
