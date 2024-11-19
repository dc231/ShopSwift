import React from 'react'
import ModernProductCard from '../Utils/ModernProductCard'

import './ProductList.css'
import Recommended from './Recommended/Recommended'
import Sidebar from './Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useState } from 'react'
const ProductListPage = () => {
  const { products } = useSelector(state => state.products)
  const [ShowProductFilterSidebar, setShowProductFilterSidebar] = useState(false)
  return (
    <section className='products-list'>
      <Sidebar ShowProductFilterSidebar={ShowProductFilterSidebar} setShowProductFilterSidebar={setShowProductFilterSidebar} />
      <Recommended ShowProductFilterSidebar={ShowProductFilterSidebar} setShowProductFilterSidebar={setShowProductFilterSidebar} />
      <section className="card-container">
        {
          (products ?? []).map((el, ind) => <ModernProductCard key={ind} {...el} />)
        }
      </section>

    </section>
  )
}

export default ProductListPage