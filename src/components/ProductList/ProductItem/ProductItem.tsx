import { memo } from 'react'
import { ProductItemType } from '../../../api/productApi.types'

export const ProductItem = memo(
  ({ id, product, price, brand }: ProductItemType) => {
    return (
      <tr>
        <td>{id}</td>
        <td>{product}</td>
        <td>{price}</td>
        <td>{brand}</td>
      </tr>
    )
  }
)

ProductItem.displayName = 'ProductItem'
