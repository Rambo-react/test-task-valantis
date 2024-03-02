import { memo } from 'react'

export const ProductItem = memo(({ id, product, price, brand }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{product}</td>
      <td>{price}</td>
      <td>{brand}</td>
    </tr>
  )
})

ProductItem.displayName = 'ProductItem'
