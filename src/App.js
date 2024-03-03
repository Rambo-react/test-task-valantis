import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import { Filter } from './components/Filter/Filter'
import { Pagination } from './components/Pagination/Pagination'
import {
  useGetFilteredIdListMutation,
  useGetIdItemsMutation,
} from './api/productsApi'
import { Loader } from './components/Loader/Loader'
import { Table } from './components/Table/Table'
import { ErrorNotifications } from './components/ErrorNotifications/ErrorNotifications'

const defaultSettings = {
  filterValue: '',
  selectedOption: 'product',
  currentPage: 1,
  limitPage: 50,
  totalPages: 1,
  idList: [],
  currentIdList: [],
}

export const App = () => {
  //filter
  const [filterValue, setFilterValue] = useState('')
  const [selectedOption, setSelectedOption] = useState('product')

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [limitPage] = useState(50)
  const [totalPages, setTotalPages] = useState(1)

  //products on current page
  const [idList, setIdList] = useState([])
  const [currentIdList, setCurrentIdList] = useState([])

  // const {GET_IDS, ID_LIST, CURRENT_ID_LIST, IS_LOADING, IS_ERROR, ERROR} = useGEtIdList(filterValue, selectedOption)

  //hooks from productsApi
  const [getIdItems, { idItemsIsLoading, idItemsIsError, IdItemsError }] =
    useGetIdItemsMutation()
  const [
    getFilteredIdList,
    { filteredIdListIsLoading, filteredIdListIsError, filteredIdListError },
  ] = useGetFilteredIdListMutation()

  //page count
  useEffect(() => {
    if (idList.length > 0) {
      const newTotalPages = Math.ceil(idList.length / limitPage)
      setTotalPages(newTotalPages)
      setCurrentPage(1)
    }
  }, [idList, limitPage])

  //products on page
  useEffect(() => {
    const lastProductIndex = limitPage * currentPage
    const firstProductIndex = lastProductIndex - limitPage
    const productsOnPage = idList.slice(firstProductIndex, lastProductIndex)
    setCurrentIdList(productsOnPage)
  }, [currentPage, idList, limitPage])

  //request to Api by condition
  const onSearchClickHandler = async () => {
    if (filterValue) {
      const data = await getFilteredIdList({
        [selectedOption]: filterValue,
      }).unwrap()
      setIdList(data.result)
    } else {
      const data = await getIdItems({}).unwrap()
      setIdList(data.result)
    }
  }

  if (idItemsIsLoading || filteredIdListIsLoading) {
    return <Loader />
  }

  if (idItemsIsError || filteredIdListIsError) {
    return <ErrorNotifications error={IdItemsError || filteredIdListError} />
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Filter
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <button
          className={styles.search}
          onClick={() => onSearchClickHandler()}
        >
          Search
        </button>
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        currentIdList={currentIdList}
      />

      <Table idList={currentIdList} />
    </div>
  )
}
