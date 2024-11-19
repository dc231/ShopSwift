import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import './ProductReviews.css'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'
import { DataGrid } from "@mui/x-data-grid"
import StarIcon from '@mui/icons-material/Star';

import { clearErrors, getReviews, deleteReviews } from '../../actions/productActions.js'
import { DELETE_REVIEW_RESET } from '../../constants/productConstant';


const ProductReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [productId, setProductId] = useState('')
    const { token } = useSelector(state => state.authToken)
    const { error, reviews, loading } = useSelector(state => state.productReviews)
    const { error: deleteError, isDeleted } = useSelector(state => state.review)


    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId, token));
    }
    const ProductReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId, token))

    }
    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getReviews(productId, token))
        }
        if (error) {

            dispatch(clearErrors())
        }

        if (deleteError) {

            dispatch(clearErrors())
        }

        if (isDeleted) {

            navigate('/admin/reviews')
            dispatch({ type: DELETE_REVIEW_RESET })
        }


    }, [dispatch, error, deleteError, navigate, isDeleted, productId, token])

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 250,
            flex: 0.4

        },
        {
            field: "user",
            headerName: "User",
            minWidth: 280,
            flex: .4

        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 400,
            flex: .4

        },
        {
            field: "rating",
            headerName: "Rating",
            // type: "number",
            minWidth: 150,
            flex: 0.2,
            cellClassName: (params) => {
                return (params.row.rating >= 3 ? "greenColor" : "redColor")
            }

        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            flex: 0.6,
            renderCell: (params) =>

                <>
                    <Link to={`/admin/product/${params?.id}`}><EditIcon /></Link>
                    <Button onClick={e => deleteReviewHandler(params.id)}>
                        <DeleteIcon />
                    </Button>

                </>

        }
    ]

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name
            })
        })


    return (
        <>

            <MetaData title={"All Reviews-Admin"} />
            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className='productReviewsForm'
                        encType='multipart/form-data'
                        onSubmit={ProductReviewsSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>All Reviews</h1>
                        <div>
                            <StarIcon />
                            <input
                                type="text"
                                value={productId}
                                placeholder='Product Id'
                                required
                                onChange={e => setProductId(e.target.value)} />
                        </div>
                        <button
                            className='createProductBtn'
                            type='submit'
                            disabled={loading || productId === "" ? true : false}
                        >
                            Search
                        </button>



                    </form>
                    {
                        reviews &&
                            reviews.length > 0 && (productId.length === 24) ?
                            <div style={{ width: '80vw' }}>
                                <DataGrid rows={rows} columns={columns} pageSize={10} pagination disableRowSelectionOnClick autoHeight sx={{ mx: 2 }} />

                            </div>
                            :
                            <h1 className='noReviews'>No review Found</h1>
                    }


                </div>
            </div>


        </>
    )
}

export default ProductReviews