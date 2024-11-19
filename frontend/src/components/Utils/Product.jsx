import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { HiArrowSmRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProducts, clearErrors } from '../../features/products/productsSlice';
import ModernProductCard from './ModernProductCard';
import './Product.css';
import Loader from '../layout/Loader/Loader';



function Product({ heading }) {
    const dispatch = useDispatch();
    const { data, error, status } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error.message || error.code);
            dispatch(clearErrors())
        }
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, error, status]);

    function renderProducts() {

        if (status === "loading") {
            return <Loader />;
        }
        if (status === 'failed') {
            return <p className='errors'>Sorry, Something went wrong from Our Side.</p>
        }

        return <>
            {
                (data?.products ?? []).map((item) => <ModernProductCard key={item._id} {...item} />)}
            {!data || data?.products?.length === 0 ? (
                <h4 className='no-products-msg'>No Products Available </h4>
            ) : null}
        </>
    }
    return (
        <div className='product-card-container'>
            <div className='product-header'>
                <div className='product-upper-l'>
                    <h2>{heading}</h2>
                    <ul className='product-options'>
                        <li className='product-option'>Hottest</li>
                        <li className='product-option'>New Arrival</li>
                        <li className='product-option'>Low Prices</li>
                        <li className='product-option active-option'>Back In Stock</li>
                    </ul>
                </div>
                <div className='product-upper-r'>
                    <Link to='/products' className='view-all-link'>
                        View all <HiArrowSmRight className='arrow-icon' />
                    </Link>
                </div>
            </div>
            <div className='products-detail'>
                {
                    renderProducts()
                }
            </div>
        </div>
    );
}

export default Product;
