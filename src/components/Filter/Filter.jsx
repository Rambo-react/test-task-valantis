import { memo } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Filter.module.scss'

export const Filter = memo(({ filterValue, selectedOption, setSettings }) => {
  const onChangeSelectHandler = (e) => {
    setSettings((settings) => ({
      ...settings,
      selectedOption: e.target.value,
      filterValue: '',
    }))
  }

  const onChangeInputHandler = (value) => {
    setSettings((settings) => ({
      ...settings,
      filterValue: selectedOption === 'price' ? Number(value) : value,
    }))
  }

  const onClearInputHandler = () => {
    setSettings((settings) => ({
      ...settings,
      filterValue: '',
    }))
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
          <div onClick={() => onClearInputHandler()} className={styles.clear}>
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
})

Filter.displayName = 'Filter'
