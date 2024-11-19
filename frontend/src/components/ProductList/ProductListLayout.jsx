
import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Recommended from './Recommended/Recommended'

const ProductListLayout = ({ children }) => {
  return (
    <div className="productList-container">
      <h1>Product List</h1>
      <Sidebar />
      <main>
        <Recommended />
        {children}
      </main>
    </div>
  )
}

export default ProductListLayout