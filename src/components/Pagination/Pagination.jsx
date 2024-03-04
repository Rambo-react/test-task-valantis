import { useState, memo, useMemo } from 'react'
import styles from './Pagination.module.scss'

export const Pagination = memo(
  ({ currentIdList, currentPage, totalPages, setSettings, portionSize }) => {
    const [portionNumber, setPortionNumber] = useState(1)
    const pagesArray = useMemo(
      () => [...new Array(totalPages)].map((el, i) => i + 1),
      [totalPages]
    )

    const portionCount = Math.ceil(totalPages / portionSize)

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const pages = useMemo(() => {
      return pagesArray
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <span
            className={`${currentPage === p && styles.active}`}
            onClick={() =>
              setSettings((settings) => ({ ...settings, currentPage: p }))
            }
            key={p}
          >
            {p}
          </span>
        ))
    }, [
      pagesArray,
      leftPortionPageNumber,
      rightPortionPageNumber,
      currentPage,
      setSettings,
    ])

    if (!(totalPages > 1 && currentIdList.length > 0)) {
      return false
    }

    const prevPage = () => {
      if (currentPage > 1) {
        if (currentPage === leftPortionPageNumber) {
          setPortionNumber((prev) => (prev > 1 ? prev - 1 : prev))
        }
        setSettings((settings) => ({
          ...settings,
          currentPage: currentPage - 1,
        }))
      }
    }

    const nextPage = () => {
      if (currentPage < totalPages) {
        if (currentPage === rightPortionPageNumber) {
          setPortionNumber((prev) => (prev < portionCount ? prev + 1 : prev))
        }
        setSettings((settings) => ({
          ...settings,
          currentPage: currentPage + 1,
        }))
      }
    }

    return (
      <div className={styles.pagination}>
        <span className={styles.navigate} onClick={() => prevPage()}>
          Prev
        </span>
        {portionNumber > 1 && (
          <span onClick={() => setPortionNumber((num) => num - 1)}>...</span>
        )}
        {pages}
        {portionNumber < portionCount && (
          <span onClick={() => setPortionNumber((num) => num + 1)}>...</span>
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
