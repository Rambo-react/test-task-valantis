import { useState, memo, useMemo } from 'react'
import styles from './Pagination.module.scss'

export const Pagination = memo(
  ({
    currentIdList,
    currentPage,
    totalPages,
    setCurrentPage,
    portionSize = 10,
  }) => {
    const [portionNumber, setPortionNumber] = useState(1)
    const pagesArray = useMemo(() => [...new Array(totalPages)], [totalPages])

    if (!(totalPages > 1 && currentIdList.length > 0)) {
      return null
    }

    const portionCount = Math.ceil(totalPages / portionSize)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const pages = pagesArray
      .filter(
        (el, index) =>
          index + 1 >= leftPortionPageNumber &&
          index + 1 <= rightPortionPageNumber
      )
      .map((el, index) => (
        <span
          className={`${currentPage === index + 1 && styles.active}`}
          onClick={() => setCurrentPage(index + 1)}
          key={index}
        >
          {index + 1}
        </span>
      ))

    const prevPage = () => {
      if (currentPage > 1) {
        if (currentPage === leftPortionPageNumber) {
          setPortionNumber((prev) => (prev > 1 ? prev - 1 : prev))
        }
        setCurrentPage((prev) => prev - 1)
      }
    }

    const nextPage = () => {
      if (currentPage < totalPages) {
        if (currentPage === rightPortionPageNumber) {
          setPortionNumber((prev) => (prev < portionCount ? prev + 1 : prev))
        }
        setCurrentPage((prev) => prev + 1)
      }
    }

    return (
      <div className={styles.pagination}>
        <span className={styles.navigate} onClick={() => prevPage()}>
          Prev
        </span>
        {portionNumber > 1 && (
          <span onClick={() => setPortionNumber(portionNumber - 1)}>...</span>
        )}
        {pages}
        {portionNumber < portionCount && (
          <span onClick={() => setPortionNumber(portionNumber + 1)}>...</span>
        )}
        <span className={styles.navigate} onClick={() => nextPage()}>
          Next
        </span>
        <div className={styles.description}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
