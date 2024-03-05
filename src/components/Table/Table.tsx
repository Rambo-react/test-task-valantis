import { memo } from 'react'
import styles from './Table.module.scss'
import { Loader } from '../Loader/Loader'
import { ProductList } from '../ProductList/ProductList'
import { useGetItemsByIds } from '../../hooks/useGetItemsByIds'
import { ErrorNotifications } from '../ErrorNotifications/ErrorNotifications'

type Props = {
  idList: Array<string>
}

export const Table = memo(({ idList }: Props) => {
  const { items, isLoading, isError, error } = useGetItemsByIds(idList)

  if (!idList) {
    return false
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorNotifications error={error} />
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
        {items && <ProductList items={items} />}
      </table>
    </div>
  )
})

Table.displayName = 'Table'
