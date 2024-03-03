import { memo } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Filter.module.scss'

export const Filter = memo(
  ({ filterValue, setFilterValue, selectedOption, setSelectedOption }) => {
    const onChangeSelectHandler = (e) => {
      setSelectedOption(e.target.value)
      setFilterValue('')
    }

    const onChangeInputHandler = (value) => {
      selectedOption === 'price'
        ? setFilterValue(Number(value))
        : setFilterValue(value)
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <div className={styles.search}>
            <Icon name='search' />
          </div>
          <input
            name='search'
            onChange={(e) => onChangeInputHandler(e.target.value)}
            value={filterValue}
            type={selectedOption === 'price' ? 'number' : 'text'}
            placeholder='Filter ...'
          />
          {filterValue && (
            <div onClick={() => setFilterValue('')} className={styles.clear}>
              <Icon name='clear' />
            </div>
          )}
        </div>
        <select onChange={(e) => onChangeSelectHandler(e)}>
          <option value='product'>product</option>
          <option value='price'>price</option>
          <option value='brand'>brand</option>
        </select>
      </div>
    )
  }
)

Filter.displayName = 'Filter'
