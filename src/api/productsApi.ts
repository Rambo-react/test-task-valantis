import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const pass = `Valantis_${stamp}`
const md5pass = md5(pass)

/**
 * You can view the documentation for the API using the link below.
 * @see {@link https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md}.
 */

// type IFields = {
//   [key: 'product' | 'brand' | 'price']: string | number
// }

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
    getIds: build.mutation<Array<string>, { offset?: number; limit?: number }>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
      transformResponse: (data: { result: Array<string> }) => data.result,
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
      transformResponse: (data: { result: Array<string> }) => data.result,
    }),
  }),
})

export const {
  useGetItemsMutation,
  useGetIdsMutation,
  useGetFilteredIdListMutation,
  useGetFieldsMutation,
} = productsApi