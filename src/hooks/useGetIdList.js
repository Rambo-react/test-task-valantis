export const useGetIdList = ({
  filterValue,
  selectedOption,
  currentPage,
  limitPage,
  totalPages,
  idList,
  currentIdList,
}) => {
  //filter
  const [filterValue, setFilterValue] = useState('')
  const [selectedOption, setSelectedOption] = useState('product')

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  //products on current page
  const [idList, setIdList] = useState([])
  const [currentIdList, setCurrentIdList] = useState([])

  //hooks from productsApi
  const [
    getIdItems,
    { idsData, idItemsIsLoading, idItemsIsError, IdItemsError },
  ] = useGetIdItemsMutation()
  const [
    getFilteredIdList,
    {
      filteredIdsData,
      filteredIdListIsLoading,
      filteredIdListIsError,
      filteredIdListError,
    },
  ] = useGetFilteredIdListMutation()

  //page count
  useEffect(() => {
    if (idList.length > 0) {
      setTotalPages(Math.ceil(idList.length / limitPage))
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

  //data from filter endpoint
  useEffect(() => {
    setIdList(filteredIdsData.result)
  }, [filteredIdsData])

  //data without filter
  useEffect(() => {
    setIdList(idsData.result)
  }, [idsData])

  //request to Api by condition
  const onSearchClickHandler = () => {
    if (filterValue) {
      getFilteredIdList({
        [selectedOption]: filterValue,
      }).unwrap()
    } else {
      getIdItems({}).unwrap()
    }
  }

  return { onSearchClickHandler, currentIdList, isLoading, isError, error }
}
