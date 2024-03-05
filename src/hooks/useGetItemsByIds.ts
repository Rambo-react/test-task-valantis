import { useEffect, useMemo } from 'react'
import { useGetItemsMutation } from '../api/productsApi'
import { UseGetItemsByIdsType } from './useGetItemsByIds.types'

export const useGetItemsByIds: UseGetItemsByIdsType = (idList) => {
  const [getItems, { data, isLoading, isError, error }] = useGetItemsMutation()
  useEffect(() => {
    getItems({ ids: idList })
  }, [idList, getItems])
  const items = useMemo(() => {
    if (data) {
      const map = new Map(data.map((o) => [o.id, o]))
      return [...map.values()]
    }
  }, [data])
  return { items, isLoading, isError, error }
}
