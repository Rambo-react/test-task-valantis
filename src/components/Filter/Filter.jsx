import { memo } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Filter.module.scss'

const Filter = ({
  filterValue,
  setFilterValue,
  selectedOption,
  setSelectedOption,
}) => {
  const onChangeSelectHandler = (e) => {
    setSelectedOption(e.target.value)
    setFilterValue('')
  }

  const onChangeInputValueHandler = (e) => {
    setFilterValue(e.target.value)
  }

  const onClearInputHandler = () => {
    setFilterValue('')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <div className={styles.search}>
          <Icon name='search' />
        </div>
        <input
          name='search'
          onChange={onChangeInputValueHandler}
          value={filterValue}
          type={`${selectedOption === 'price' ? 'number' : 'text'}`}
          placeholder='Filter ...'
        />
        {filterValue && (
          <div onClick={onClearInputHandler} className={styles.clear}>
            <Icon name='clear' />
          </div>
        )}
      </div>
      <select onChange={onChangeSelectHandler}>
        <option value='product'>product</option>
        <option value='price'>price</option>
        <option value='brand'>brand</option>
      </select>
    </div>
  )
}

export default memo(Filter)
