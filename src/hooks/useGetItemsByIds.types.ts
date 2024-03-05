import { ProductItemType } from '../api/productApi.types'

export type UseGetItemsByIdsType = (idList: Array<string>) => {
  items: Array<ProductItemType> | Array<unknown>
  isLoading: boolean
  isError: boolean
  error: unknown
}
