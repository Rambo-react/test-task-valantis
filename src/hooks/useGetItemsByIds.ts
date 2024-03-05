import { useEffect, useMemo } from 'react'
import { useGetItemsMutation } from '../api/productsApi'

export type ProductItemType = {
  id: string
  product: string
  price: number
  brand: string | null
}

type UseGetItemsByIdsType = (idList: Array<string>) => {
  items: Array<ProductItemType> | Array<unknown>
  isLoading: boolean
  isError: boolean
  error: unknown
}

export const useGetItemsByIds: UseGetItemsByIdsType = (idList) => {
  const [getItems, { data, isLoading, isError, error }] = useGetItemsMutation()
  useEffect(() => {
    getItems({ ids: idList })
  }, [idList, getItems])
  const items = useMemo(() => {
    if (data) {
      const result = data.result
      const map = new Map(result.map((o) => [o.id, o]))
      return [...map.values()]
    }
  }, [data])
  return { items, isLoading, isError, error }
}
