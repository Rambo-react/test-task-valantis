import React from 'react'

const ProductItem = ({ id, product, price, brand }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{product}</td>
      <td>{price}</td>
      <td>{brand}</td>
    </tr>
  )
}

export default ProductItem
