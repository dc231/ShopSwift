import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData.js'
import './MyOrders.css'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/newOrderAction'
import MenuLayout from '../User/MenuLayout/MenuLayout'
import OrderList from '../Utils/OrderList/OrderList.jsx'

const MyOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user, isAuthenticated } = useSelector(state => state.authData)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (!isAuthenticated) navigate('/login?redirect=orders')

        dispatch(myOrders())

    }, [dispatch, error, user, isAuthenticated, navigate])
    return (
        <>
            <MetaData title={`${user?.name ?? "User"}-Orders`} />
            <MenuLayout title='My Orders'>
                <OrderList ordersData={orders} />
            </MenuLayout>

        </>
    )
}

export default MyOrders