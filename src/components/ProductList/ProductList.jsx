import { memo } from 'react'
import ProductItem from './ProductItem/ProductItem'

const ProductList = ({ items }) => {
  return (
    <tbody>
      {items.map((el) => (
        <ProductItem key={el.id} {...el} />
      ))}
    </tbody>
  )
}

export default memo(ProductList)
