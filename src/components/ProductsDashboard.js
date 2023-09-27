import React from 'react'
import Products from './products'
import Cart from './Cart'

const ProductsDashboard = () => {
  return (
    <div className='container d-xl-flex'>
      <div className='col'>
        <Products />
      </div>
      <div className='col'>
        <Cart />
      </div>
    </div>
  )
}

export default ProductsDashboard