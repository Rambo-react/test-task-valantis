import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const pass = `Valantis_${stamp}`
const md5pass = md5(pass)

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
    /**
     * Method for restoring an ordered list of product identifiers.
     * Next, using the selected identifiers, you can request detailed information about the product.
     * Returns a new array with objects whose id field is unique.
     * By default, the IDs of all products are restored.
     * @param {Object} params
     * @param {number} [params.offset] - Positive number ratio. Specifies placement relative to the beginning of the list.
     * @param {number} [params.limit] - Positive ratio of a number. Determining the desired number of records to return.
     * @returns {Object} - The result of the method is returned using the result key.
     */
    getIdItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_ids', params },
      }),
    }),
    /**
     * Returns an ordered list of products with all characteristics if product IDs are passed.
     * Maximum 100 entries.
     * @param {Object} params
     * @param {Array.<string>} params.ids - List of strings. Defines the IDs of the items that will be returned.
     * @returns {Object} - The result of the method is returned using the result key.
     */
    getItems: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_items', params },
      }),
    }),
    /**
     * Without parameters, returns an ordered list of available product fields.
     * When passing the parameter, field returns an ordered list of values ​​for the given product field.
     * @param {Object} params
     * @param {string} [params.field] - Must contain a valid product field name.
     * @param {number} [params.offset] - Positive number ratio. Specifies placement relative to the beginning of the list.
     * @param {number} [params.limit] - Positive ratio of a number. Determining the desired number of records to return.
     * @returns {Object} - The result of the method is returned using the result key.
     */
    getFields: build.mutation({
      query: (params) => ({
        url: '/',
        method: 'POST',
        body: { action: 'get_fields', params },
      }),
    }),
    /**
     * Returns an ordered list of product IDs that match the given value.
     * Any field returned by the get_fields method without parameters can be used as a parameter.
     * The value must be the data type corresponding to the field.
     * For the product field, the occurrence of the parameter in the string will be checked.
     * For other fields, strict matching is checked.
     * @param {Object} params
     * @param {(string|number)} params.[FieldName] - If FieldName = “price”, then the type is a number. For "product" and "brand" the type is string.
     * @returns {Object} - The result of the method is returned using the result key.
     */
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
