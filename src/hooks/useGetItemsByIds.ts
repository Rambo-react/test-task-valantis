import { useEffect, useMemo } from 'react'
import { useGetItemsMutation } from '../api/productsApi'
import { UseGetItemsByIdsType } from './useGetItemsByIds.types'

export const useGetItemsByIds: UseGetItemsByIdsType = (idList) => {
  const [getItems, { data, isLoading, isError, error }] = useGetItemsMutation()
  useEffect(() => {
    if (idList.length > 0) {
      getItems({ ids: idList })
    }
  }, [idList, getItems])
  const items = useMemo(() => {
    if (idList.length === 0) {
      return null
    }
    if (data) {
      const map = new Map(data.map((o) => [o.id, o]))
      return [...map.values()]
    }
    return null
  }, [data, idList])
  return { items, isLoading, isError, error }
}
