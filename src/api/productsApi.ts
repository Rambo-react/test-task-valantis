import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
import {
  FieldsType,
  GetFieldParamsType,
  GetIdsParamsType,
  GetItemsRequestType,
  ProductItemType,
  ResponseType,
} from './productApi.types'
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
    getIds: build.mutation<ResponseType, GetIdsParamsType>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
      transformResponse: (data: { result: ResponseType }) => data.result,
    }),
    getItems: build.mutation<Array<ProductItemType>, GetItemsRequestType>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_items', params },
      }),
      transformResponse: (data: { result: Array<ProductItemType> }) =>
        data.result,
    }),
    getFields: build.mutation<Array<any>, GetFieldParamsType>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_fields', params },
      }),
      transformResponse: (data: { result: Array<any> }) => data.result,
    }),
    getFilteredIdList: build.mutation<ResponseType, FieldsType>({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'filter', params },
      }),
      transformResponse: (data: { result: ResponseType }) => data.result,
    }),
  }),
})

export const {
  useGetItemsMutation,
  useGetIdsMutation,
  useGetFilteredIdListMutation,
  useGetFieldsMutation,
} = productsApi
