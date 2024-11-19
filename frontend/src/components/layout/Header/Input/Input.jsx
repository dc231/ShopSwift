import React from 'react'
import './Input.css'
import { FiSearch } from "react-icons/fi";
const Input = ({ setKeyword, onSubmit, value, searchResults = [] }) => {

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSubmit(e)
        }
    }
    return (
        <div className='search-input'>
            <FiSearch />
            <input type="text" placeholder='Search a product...' onChange={handleSearchChange} onKeyDown={handleKeyDown} />
            {!!searchResults.length && <div className="search-results">Search Results</div>}
        </div>
    )
}

export default Input