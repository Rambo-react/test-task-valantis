import { memo } from 'react'
import { ProductItem } from './ProductItem/ProductItem'

export const ProductList = memo(({ items }) => {
  return (
    <tbody>
      {items.map((el) => (
        <ProductItem key={el.id} {...el} />
      ))}
    </tbody>
  )
})

ProductList.displayName = 'ProductList'
