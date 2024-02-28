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
          <svg
            width='800px'
            height='800px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z'
              fill='#0F0F0F'
            />
          </svg>
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
            <svg
              fill='#000000'
              width='800px'
              height='800px'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z' />
            </svg>
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

export default Filter
