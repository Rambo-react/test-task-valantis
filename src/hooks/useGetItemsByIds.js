import { useEffect, useMemo } from 'react'
import { useGetItemsMutation } from '../api/productsApi'

export const useGetItemsByIds = (idList) => {
  const [getItems, { data, isLoading, isError, error }] = useGetItemsMutation()

  useEffect(() => {
    getItems({ ids: idList })
  }, [idList])
  const items = useMemo(() => {
    if (data) {
      const result = data.result
      const map = new Map(result.map((o) => [o.id, o]))
      return [...map.values()]
    }
  }, [data])

  return { items, isLoading, isError, error }
}
