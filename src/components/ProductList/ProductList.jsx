import React, { useState } from 'react'
import { useEffect } from 'react'
import makeUniqArray from '../../utils/makeUniqArray'
import { useGetProductsMutation } from '../api/productsApi'
import Pagination from '../Pagination/Pagination'
import ProductItem from './ProductItem/ProductItem'
import styles from './ProductList.module.scss'

const ProductList = ({ idList }) => {
  const [items, setItems] = useState([])

  const [getProducts, { isLoading, isError, error }] = useGetProductsMutation()

  const getProductsByIds = async () => {
    const { data } = await getProducts({ ids: idList })
    const uniqArray = makeUniqArray(data.result)
    console.log('uniqArray products', uniqArray)
    setItems(uniqArray)
  }

  useEffect(() => {
    getProductsByIds()
    console.log('useEffect в ProductList')
  }, [idList])

  let content
  let info

  if (isLoading) {
    info = <h1>Загрузка...</h1>
  }

  if (isError) {
    console.log('Ошибка получения продуктов:', error)
    info = <h1>Ошибка</h1>
  }

  if (items.length > 0 && !isLoading && !isError) {
    content = items.map((el, index) => <ProductItem key={index} {...el} />)
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>product</th>
            <th>price</th>
            <th>brand</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      <div className={styles.info}>{info}</div>
    </div>
  )
}

export default ProductList
