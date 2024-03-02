import { useState, memo } from 'react'
import styles from './Pagination.module.scss'

export const Pagination = memo(
  ({ currentPage, totalPages, setCurrentPage, portionSize = 10 }) => {
    let pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }

    let portionCount = Math.ceil(totalPages / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const content = pages
      .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map((p) => (
        <span
          className={`${currentPage === p && styles.active}`}
          onClick={(e) => setCurrentPage(p)}
          key={p}
        >
          {p}
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
        <span className={styles.navigate} onClick={prevPage}>
          &lt; Prev
        </span>
        {portionNumber > 1 && (
          <span onClick={() => setPortionNumber(portionNumber - 1)}>...</span>
        )}
        {content}
        {portionNumber < portionCount && (
          <span onClick={() => setPortionNumber(portionNumber + 1)}>...</span>
        )}
        <span className={styles.navigate} onClick={nextPage}>
          Next &gt;
        </span>
        <div className={styles.description}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
