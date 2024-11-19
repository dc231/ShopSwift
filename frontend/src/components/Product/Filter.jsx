import React, { useState } from 'react'
import './filter.css'
import CloseIcon from '@mui/icons-material/Close'
import Modal from '../Utils/Modal'
import { Box, Slider } from '@mui/material'
import { categoryItems, filtersLabels, sortByItems } from '../../Constants'

const Filter = ({ setIsOpen, setSelectedFilterOptions }) => {
  const [price, setPrice] = useState([0, 90000])
  const [rating, setRating] = useState([4, 5])
  const [category, setCategory] = useState('')
  const [activeTab, setActiveTab] = useState('Sort By')
  const handleClick = (str) => {
    setActiveTab(str)
  }
  const handleCategoryChange = (e) => {

    setCategory(e.target.value)
  }
  return (
    <Modal setIsOpen={setIsOpen}>
      <div className='filter-box'>
        <h3>Select Filters</h3>
        <button className='close-btn' onClick={e => setIsOpen(false)}>
          <CloseIcon style={{ fontSize: '2rem' }} />
        </button>
        <div className='filter_items'>
          <div>
            {filtersLabels.map(label => (
              <div className={`filter_item-label ${activeTab === label && 'active'}`} onClick={e => handleClick(label)}>
                {label}
              </div>
            ))}
          </div>
          <div>
            {activeTab === 'Sort By' && sortByItems.map(val => (
              <div className='label'>
                <input type='radio' id='1' name='sory_by' />
                <label htmlFor='1'>
                  {val}
                </label>
              </div>
            ))}
            {activeTab === 'Category' && categoryItems.map(val => (
              <div className='label'>
                <input
                  type='radio'
                  id={val.label}
                  name='sory_by'
                  onChange={e => handleCategoryChange(e)}
                  value={val.value} />
                <label htmlFor={val.label}>
                  {val.label}
                </label>
              </div>
            ))}
            {activeTab === 'Price' && <div className="priceFilter">
              <span className='filterLabel'>Price: ${price[0]} - ${price[1]}</span>
              <Box sx={{ width: 250 }}>
                <Slider
                  getAriaLabel={() => 'Product Price'}
                  value={price}
                  min={100}
                  max={10000}
                  onChange={(e, val) => setPrice(val)}
                  valueLabelDisplay="auto"

                />
              </Box>
            </div>}
            {activeTab === 'Rating' && <div className="priceFilter">
              <span className='filterLabel'>Rating: {rating[0]} - {rating[1]}</span>
              <Box sx={{ width: 250 }}>
                <Slider
                  getAriaLabel={() => 'Product Price'}
                  value={rating}
                  min={0}
                  max={5.0}
                  onChange={(e, val) => setRating(val)}
                  valueLabelDisplay="auto"

                />
              </Box>
            </div>}
            {activeTab === 'More Filters' && <h4>Filters on Deals is not Found</h4>}
          </div>
        </div>
      </div>
    </Modal>

  )
}

export default Filter
