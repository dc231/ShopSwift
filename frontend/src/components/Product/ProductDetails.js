import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import {
    clearErrors,
    getProductsDetails,
    newReview,
} from '../../actions/productActions'

import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { toast } from 'react-hot-toast'
import MetaData from '../layout/MetaData'
import { addItemToCart } from '../../actions/cartAction'

import { Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const params = useParams()
    let pathname = useLocation().pathname.replaceAll('/', ' > ')
    pathname = 'ShopSwift' + pathname

    const { token } = useSelector((state) => state.authToken)
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    )

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    )

    const [posterImageIndex, setPosterImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const decrementQuantity = () =>
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    const incrementQuantity = () => setQuantity(quantity + 1)

    const addToCardHandler = () => {
        dispatch(addItemToCart(params.id, quantity))
        toast.success('Item added to Cart ')
    }
    const submitReviewToggle = () => {
        setOpen(!open)
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData()
        myForm.set('rating', rating)
        myForm.set('comment', comment)
        myForm.set('productId', params.id)
        myForm.set('token', token)
        dispatch(newReview(myForm))
        setOpen(false)
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }

        if (reviewError) {
            toast.error(reviewError)
            dispatch(clearErrors)
        }
        if (success) {
            toast.success('Review Submitted Successfully !!')
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProductsDetails(params.id))
    }, [params.id, dispatch, error, success, reviewError])

    const options = {
        // size: "large",
        value: Number(product?.ratings),
        precision: 0.5,
        readOnly: true,
    }

    return (
        <>
            {loading || product?._id !== params?.id ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product?.name}`} />

                    <div className="pathLink">
                        <p>
                            {pathname.length > 0 && pathname} ({' '}
                            {product && product.name} )
                        </p>
                    </div>
                    <div className="product-info-card">
                        <div className="product-info-image">
                            <div className="left">
                                {product &&
                                    product.images &&
                                    product.images.map((img, ind) => (
                                        <img
                                            onClick={(e) =>
                                                setPosterImageIndex(ind)
                                            }
                                            key={img.url}
                                            src={img.url}
                                            alt="Preview"
                                            className={`${
                                                ind === posterImageIndex &&
                                                'active-image '
                                            }`}
                                        />
                                    ))}
                            </div>
                            <div className="right">
                                {' '}
                                <img
                                    src={
                                        product &&
                                        product.images &&
                                        product?.images?.length > 0
                                            ? product.images[posterImageIndex]
                                                  .url
                                            : '#'
                                    }
                                    alt="Mobile Phone"
                                />
                            </div>
                        </div>
                        <div className="product-info-info">
                            <div className="product-info-title">
                                {product?.name}
                            </div>
                            <div className="product-info-more">
                                <div className="product-info-id">
                                    <span className="id"># {product?._id}</span>
                                    <span>
                                        <span id="product-info-rating">
                                            {product?.rating}
                                        </span>
                                        <Rating {...options} /> (
                                        {product?.numOfReviews} Reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="product-info-cart">
                                <div className="product-info-price">
                                    <span>$4999.99</span>
                                    <span>${product?.price}</span>
                                </div>
                                <div className="product-info-add-to-cart">
                                    <button onClick={decrementQuantity}>
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button onClick={incrementQuantity}>
                                        +
                                    </button>

                                    <span
                                        onClick={addToCardHandler}
                                        className="product-info-add-to-cart-btn"
                                    >
                                        Add to Cart
                                    </span>
                                </div>
                            </div>
                            <div className="product-info-desc">
                                <span>Product Information :</span>
                                <br />
                                {product?.description}
                            </div>
                        </div>
                    </div>
                    <h3 className="reviewHeading">REVIEWS</h3>

                    {product && product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews?.map((review) => (
                                    <>
                                        <ReviewCard
                                            key={review._id}
                                            review={review}
                                        />
                                    </>
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    )
}

export default ProductDetails
