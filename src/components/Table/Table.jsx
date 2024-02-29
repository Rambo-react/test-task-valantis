import React, { useState } from 'react'
import { useEffect, memo } from 'react'
import makeUniqArray from '../../utils/makeUniqArray'
import { useGetItemsMutation } from '../../api/productsApi'
import styles from './Table.module.scss'
import Loader from '../Loader/Loader'
import ProductList from '../ProductList/ProductList'
// import { useMemo } from 'react'

const Table = ({ idList }) => {
  const [items, setItems] = useState([])

  const [getItems, { isLoading, isError, error }] = useGetItemsMutation()

  const getProductsByIds = async () => {
    const { data } = await getItems({ ids: idList })
    const { result } = data
    const uniqArray = makeUniqArray(result)

    // const uniqArray = useMemo(() => {
    //   const filteredArray = []

    //   for (let i = 0; i < result.length; i++) {
    //     const item = result[i]
    //     if (!filteredArray.some((element) => element.id === item.id)) {
    //       filteredArray.push(item)
    //     }
    //   }
    //   return filteredArray
    // }, [result])
    setItems(uniqArray)
  }

  useEffect(() => {
    getProductsByIds()
  }, [idList])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    console.log(error)
    return <h1>Ошибка</h1>
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <ProductList items={items} />
      </table>
    </div>
  )
}

export default memo(Table)
