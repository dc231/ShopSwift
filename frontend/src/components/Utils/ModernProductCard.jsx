import { Rating } from '@mui/material'
import React from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { Link } from 'react-router-dom'
import './ModernProductCard.css'

const ModernProductCard = ({ ratings, _id, images, name, price, numOfReviews, description }) => {

    return (
        <Link className='product_card' to={`/product/${_id}`}>

            <div className='product_card-upper '>
                <img src={images?.[0]?.url} alt="" />
                <span className='wishlist'><AiOutlineHeart /></span>
            </div>

            <div className='product_card-lower'>
                <h2>{name}</h2>
                <div>
                    <span className='curr_price'>₹{(price * (1 - 0.25)).toFixed(2)}</span>
                    <span className='old_price' >₹{price}</span>

                </div>
                <div>
                    <Rating value={ratings} precision={0.25} />
                    <span>({numOfReviews})</span>
                </div>
            </div>

        </Link>

    )
}

export default ModernProductCard