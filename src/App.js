import styles from './App.module.scss'
import { Filter } from './components/Filter/Filter'
import { Pagination } from './components/Pagination/Pagination'
import { Loader } from './components/Loader/Loader'
import { Table } from './components/Table/Table'
import { ErrorNotifications } from './components/ErrorNotifications/ErrorNotifications'
import { useApp } from './hooks/useApp'

const defaultSettings = {
  filterValue: '',
  selectedOption: 'product',
  currentPage: 1,
  limitPage: 50,
  totalPages: 1,
  portionSize: 10,
}

export const App = () => {
  const {
    getIdList,
    setSettings,
    isLoading,
    isError,
    error,
    currentIdList,
    totalPages,
    currentPage,
    portionSize,
    filterValue,
    selectedOption,
  } = useApp(defaultSettings)

  console.log('app')
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorNotifications error={error} />
  }

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Filter
          filterValue={filterValue}
          selectedOption={selectedOption}
          setSettings={setSettings}
        />
        <button className={styles.search} onClick={getIdList}>
          Search
        </button>
      </div>

      <Pagination
        setSettings={setSettings}
        currentPage={currentPage}
        totalPages={totalPages}
        currentIdList={currentIdList}
        portionSize={portionSize}
      />

      <Table idList={currentIdList} />
    </div>
  )
}
