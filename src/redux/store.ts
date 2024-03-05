import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../api/productsApi'

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  /** Add a middleware API, which will give us caching, invalidation, polling and other useful things */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
