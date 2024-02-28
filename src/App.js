import { useEffect, useState } from 'react'
import styles from './App.module.scss'
import ProductList from './components/ProductList/ProductList'
import Filter from './components/Filter/Filter'
import Pagination from './components/Pagination/Pagination'
import {
  useGetFilteredIdsMutation,
  useGetIdsMutation,
} from './components/api/productsApi'

function App() {
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

  //hooks from productsApi
  const [getAllIds, getAllinfo] = useGetIdsMutation()
  const [getFilteredIds, getFilteredInfo] = useGetFilteredIdsMutation()

  //page count
  useEffect(() => {
    if (idList.length > 0) {
      const newTotalPages = Math.ceil(idList.length / limitPage)
      setTotalPages(newTotalPages)
      setCurrentPage(1)
      console.log('изменили количество страниц на :', newTotalPages)
    }
  }, [idList])

  //products on page
  useEffect(() => {
    const lastProductIndex = limitPage * currentPage
    const firstProductIndex = lastProductIndex - limitPage
    const productsOnPage = idList.slice(firstProductIndex, lastProductIndex)
    setCurrentIdList(productsOnPage)
    console.log('засетали часть айдишников для страницы', productsOnPage)
  }, [currentPage, idList])

  //request to Api by condition
  const onSearchClickHandler = async () => {
    if (filterValue) {
      //set type of value
      let inputValue = filterValue
      if (selectedOption === 'price') {
        inputValue = Number(filterValue)
      }
      //=
      const data = await getFilteredIds({
        [selectedOption]: inputValue,
      }).unwrap()
      setIdList(data.result)
      console.log(
        `достали айдишники по фильтру ${selectedOption} : ${filterValue}`,
        data.result
      )
    } else {
      const data = await getAllIds({}).unwrap()
      setIdList(data.result)
      console.log(`достали айдишники без фильтра`, data.result)
    }
  }

  if (getFilteredInfo.isLoading || getAllinfo.isLoading) {
    console.log('Loading')
    return <h1>Загружаются данные...</h1>
  }

  if (getFilteredInfo.isError || getAllinfo.isError) {
    console.log('ОШИБКА')
    return <h1>ОШИБКА</h1>
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
        <button className={styles.search} onClick={onSearchClickHandler}>
          Search
        </button>
      </div>

      <p>
        Страница {currentPage} из {totalPages}
      </p>
      {totalPages > 1 && currentIdList.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
      {currentIdList.length > 0 && <ProductList idList={currentIdList} />}
    </div>
  )
}

export default App
