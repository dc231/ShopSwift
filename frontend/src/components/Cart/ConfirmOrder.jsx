import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import './ConfirmOrder.css'
const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

    const navigate = useNavigate();
    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate('/process/payment')
    }
    return (
        <>
            <MetaData title={"Confirm Order"} />
            <CheckoutSteps activeStep={1} />
            <div className="confirm_order-page">
                <div>
                    <div className='confirm_shipping-area'>
                        <h2 className='order-heading'><span className='profile-name'>Billing Add</span>ress</h2>
                        <div className="confirm_shipping-areaBox">
                            <div>
                                <span>Name:</span>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <span>Phone:</span>
                                <p>+91 {shippingInfo.phoneNo}</p>
                            </div>

                            <div>
                                <span>Address:</span>
                                <p>{address.toString()}</p>
                            </div>

                        </div>
                    </div>
                    <div className="confirm_cart-items">
                        <h2 className='order-heading'><span className='profile-name'>Yout Ca</span>rt Items</h2>
                        <div className="confirm_cartItems-container">
                            {
                                cartItems &&
                                cartItems.map((item) => (
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
                </div>

                <div>
                    <div className="order-summary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>

                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>

                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹ {totalPrice}</span>
                        </div>
                        <div className='confirm_order-btn'>
                            <button onClick={proceedToPayment}>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder