
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getOrderDetail } from '../../actions/newOrderAction'
import MenuLayout from '../User/MenuLayout/MenuLayout'
import MetaData from '../layout/MetaData'
import './MyOrdersDetails.css'
import ItemSummary from '../Utils/ItemSummary/ItemSummary'

const MyOrderDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { token } = useSelector(state => state.authToken)



    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getOrderDetail(params.id))
    }, [dispatch, error, params.id, token])

    return (

        <>
            <MetaData title={`Order Details : ${order?._id ?? ""}`} />
            <MenuLayout title={`Order #${order?._id ?? ""}`}>
                <div>
                    <ItemSummary items={order?.orderItems} />
                    <div></div>
                </div>
                <div></div>
            </MenuLayout>
        </>
    )
}

export default MyOrderDetails
