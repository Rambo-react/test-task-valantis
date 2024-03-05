import { memo } from 'react'
import { ProductItem } from './ProductItem/ProductItem'
import type { ProductItemType } from '../../hooks/useGetItemsByIds'

type Props = {
  items: Array<ProductItemType> | Array<unknown>
}

export const ProductList = memo(({ items }: Props) => {
  return (
    <tbody>
      {items.map((el: ProductItemType) => (
        <ProductItem key={el.id} {...el} />
      ))}
    </tbody>
  )
})

ProductList.displayName = 'ProductList'
