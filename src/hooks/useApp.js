import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useGetFilteredIdListMutation,
  useGetIdsMutation,
} from '../api/productsApi'

export const useApp = (defaultSettings) => {
  //hooks from productsApi
  const [
    getIds,
    {
      data: idsData,
      isLoading: idItemsIsLoading,
      isError: idItemsIsError,
      error: idItemsError,
    },
  ] = useGetIdsMutation()

  const [
    getFilteredIdList,
    {
      data: filteredIdsData,
      isLoading: filteredIdListIsLoading,
      isError: filteredIdListIsError,
      error: filteredIdListError,
    },
  ] = useGetFilteredIdListMutation()

  const [
    { filterValue, selectedOption, currentPage, limitPage, portionSize },
    setSettings,
  ] = useState(defaultSettings)

  // all products
  const [idList, setIdList] = useState([])

  //data with filter
  useEffect(() => {
    if (!filteredIdsData) return

    setIdList(filteredIdsData.result)
  }, [filteredIdsData])

  //data without filter
  useEffect(() => {
    if (!idsData) return

    setIdList(idsData.result)
  }, [idsData])

  // totalPages memo
  const totalPages = useMemo(() => {
    return Math.ceil(idList.length / limitPage)
  }, [idList, limitPage])

  // current page
  useEffect(() => {
    setSettings((settings) => ({
      ...settings,
      currentPage: 1,
    }))
  }, [idList, limitPage])

  // products on page memo
  const currentIdList = useMemo(() => {
    const lastProductIndex = limitPage * currentPage
    const firstProductIndex = lastProductIndex - limitPage
    return idList.slice(firstProductIndex, lastProductIndex)
  }, [currentPage, idList, limitPage])

  //request to Api by condition
  const getIdList = useCallback(() => {
    if (filterValue) {
      getFilteredIdList({
        [selectedOption]: filterValue,
      }).unwrap()
    } else {
      getIds({}).unwrap()
    }
  }, [filterValue, selectedOption, getFilteredIdList, getIds])

  return {
    getIdList,
    setSettings,
    isLoading: idItemsIsLoading || filteredIdListIsLoading,
    isError: idItemsIsError || filteredIdListIsError,
    error: idItemsError || filteredIdListError,
    currentIdList,
    totalPages,
    currentPage,
    portionSize,
    filterValue,
    selectedOption,
  }
}
