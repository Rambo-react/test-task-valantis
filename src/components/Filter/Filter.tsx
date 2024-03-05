import { memo } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Filter.module.scss'
import { DefaultSettingsType } from '../../hooks/useApp.types'

interface Props {
  filterValue: string | number
  selectedOption: string
  setSettings: React.Dispatch<React.SetStateAction<DefaultSettingsType>>
}

export const Filter = memo(
  ({ filterValue, selectedOption, setSettings }: Props) => {
    const onChangeSelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (
      e
    ) => {
      setSettings((settings) => ({
        ...settings,
        selectedOption: e.target.value,
        filterValue: '',
      }))
    }

    const onChangeInputHandler: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ) => {
      setSettings((settings) => ({
        ...settings,
        filterValue:
          selectedOption === 'price' ? Number(e.target.value) : e.target.value,
      }))
    }

    const onClearInputHandler: React.MouseEventHandler<HTMLDivElement> = () => {
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
            onChange={(e) => onChangeInputHandler(e)}
            value={filterValue}
            type={selectedOption === 'price' ? 'number' : 'text'}
            placeholder='Filter ...'
          />
          {filterValue && (
            <div onClick={onClearInputHandler} className={styles.clear}>
              <Icon name='clear' />
            </div>
          )}
        </div>
        <select
          name='filtered field'
          onChange={(e) => onChangeSelectHandler(e)}
        >
          <option value='product'>product</option>
          <option value='price'>price</option>
          <option value='brand'>brand</option>
        </select>
      </div>
    )
  }
)

Filter.displayName = 'Filter'
