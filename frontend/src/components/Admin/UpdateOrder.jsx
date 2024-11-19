import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetail, updateOrder } from '../../actions/newOrderAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import './UpdateOrder.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'
import DashboardLayout from './DashboardLayout/DashboardLayout'

const UpdateOrder = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { token } = useSelector(state => state.authToken)
    const { error: updateError, isUpdated } = useSelector(state => state.order)

    const [Status, setStatus] = useState("")


    const UpdateOrderSubmitHandler = (e) => {

        e.preventDefault();
        const myForm = new FormData();

        myForm.set("status", Status)
        myForm.set("token", token)


        dispatch(updateOrder(params.id, myForm))

    }

    useEffect(() => {
        if (error) {

            dispatch(clearErrors())
        }
        if (updateError) {

            dispatch(clearErrors());

        }
        if (isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET })
        }
        dispatch(getOrderDetail(params.id, token))
    }, [dispatch, error, params.id, isUpdated, updateError, token])
    return (
        <> {
            loading ? <Loader /> :
                <>
                    <MetaData title={'Update Order'} />
                    <DashboardLayout>
                        <div className="dashboard">


                            <div className="update_order-container">
                                <div>
                                    <div className='confirm_shipping-area'>
                                        <h3>Shipping Info :</h3>
                                        <div className="order_details-container-box">
                                            <div>
                                                <span>Name:</span>
                                                <p>{order && order.user && order.user.name}</p>
                                            </div>
                                            <div>
                                                <span>Phone:</span>
                                                <p>{order && order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                            </div>
                                            <div>
                                                <span>Address:</span>
                                                <p>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</p>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="order_status-container">
                                        <span >Order Status :</span>
                                        <p
                                            className={order &&
                                                order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                            }>
                                            {
                                                order?.orderStatus

                                            }

                                        </p>
                                        <p
                                            className={order &&
                                                order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                            }>


                                            {order && order.orderStatus === "Delivered" &&
                                                "Date : " + order?.deliveredAt?.split('T')[0]

                                            }
                                        </p>
                                    </div>

                                    <div className="update_order_cartItems-container">
                                        <h3>Your Cart Items :</h3>
                                        {order &&
                                            order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    <span>{item.quantity} X ₹{item.price} =
                                                        <b>₹{item.price * item.quantity}</b></span>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                                <div>

                                    <div className="order_payment-detail-container">
                                        <h3>Payment :</h3>
                                        <div>
                                            <p
                                                className={order &&
                                                    order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                                }>
                                                {order &&
                                                    order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"
                                                }
                                            </p>

                                        </div>
                                        <div>
                                            <h3>Amount :</h3>
                                            <span className='order-price'>₹{order && order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: order &&
                                            order.orderStatus && order.orderStatus === "Delivered"
                                            ? "none" : ""
                                    }}>
                                        <form
                                            className='createProductForm'
                                            encType='multipart/form-data'
                                            onSubmit={UpdateOrderSubmitHandler}
                                        >
                                            <h1>Process Order </h1>
                                            <div>
                                                <AccountTreeIcon />
                                                <select
                                                    onChange={e => setStatus(e.target.value)}
                                                    value={Status}
                                                >
                                                    <option value="">Choose Order Status</option>
                                                    {
                                                        order &&
                                                        order.orderStatus && order.orderStatus === "Processing" &&

                                                        <option value="Shipped">Shipped</option>
                                                    }
                                                    {
                                                        order &&
                                                        order.orderStatus && order.orderStatus === "Shipped"
                                                        &&
                                                        <option value="Delivered">Delivered</option>
                                                    }

                                                </select>
                                            </div>
                                            <button
                                                className='createProductBtn'
                                                type='submit'
                                                disabled={(loading ? true : false) || (Status === "" ? true : false)}
                                            >
                                                Update Status
                                            </button>

                                        </form>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </DashboardLayout>

                </>
        }
        </>





    )
}

export default UpdateOrder