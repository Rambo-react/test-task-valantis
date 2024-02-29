import { configureStore } from '@reduxjs/toolkit'
// import products from './productsSlice'
import { productsApi } from '../api/productsApi'

export const store = configureStore({
  reducer: {
    // products,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Добавляем апи мидлвар, что даст нам кэширование, инвалидацию, полинг,
  // и другие полезные штуки
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})
