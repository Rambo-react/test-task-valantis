import { memo } from 'react'
import { ProductItem } from './ProductItem/ProductItem'
import { ProductItemType } from '../../api/productApi.types'

interface Props {
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
