import { createSlice } from '@reduxjs/toolkit'
import makeUniqArray from '../utils/makeUniqArray'

const initialState = {
  idList: [],
  items: [],
  filterVal: null,
  filterField: 'product',
  totalPages: 1,
  limitPage: 50,
  currentPage: 1,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems(state, action) {
      const uniqArray = makeUniqArray(action.payload)
      state.items = uniqArray
    },
    setIdList(state, action) {
      state.idList = action.payload
    },
    setFilterVal(state, action) {
      state.filterVal = action.payload.filterVal
      state.filterField = action.payload.filterField
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = Math.ceil(action.payload / state.limitPage)
    },
  },
})

export const {
  setItems,
  setIdList,
  setFilterVal,
  setCurrentPage,
  setTotalPages,
} = productsSlice.actions

export default productsSlice.reducer
