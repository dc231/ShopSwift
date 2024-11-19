
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ProcessPayment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { Typography } from '@mui/material';
import { toast } from 'react-hot-toast'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { clearErrors, createOrder } from '../../actions/newOrderAction'
import { AxiosClient } from '../../config/Constants'

const ProcessPayment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const payBtn = useRef(null)
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)
    const { error } = useSelector(state => state.newOrder)
    const { token } = useSelector(state => state.authToken)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }


    //Order Data Creation 
    const order = {
        shippingInfo,
        orderItems: [...cartItems],
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingPrice,
        totalPrice: orderInfo.totalPrice,
    }



    //Payment Handler
    const paymentHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                withCredentials: true,
                Headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await AxiosClient.get("/api/v1/payment/process",
                { paymentData },
                config);
            const client_secret = data.client_secret

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email,
                            address: {
                                line1: shippingInfo.address,
                                city: shippingInfo.city,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.pinCode,
                                country: shippingInfo.country
                            }
                        }
                    }

                })

            if (result.error) {
                console.log(result);
                payBtn.current.disabled = false;
                toast.error(result.error.message ? result.error.message : "Unexpected Error Encountered.Line no 90")
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    order.token = token
                    dispatch(createOrder(order))
                    navigate('/success')
                }
                else {
                    console.log(result);
                    toast.error(result.error.message ? result.error.message : "Unexpected Error Encountered.Line no 104")
                }
            }
        } catch (error) {
            console.log(error);
            payBtn.current.disabled = false;
            toast.error(error?.response?.data?.error ?? error?.data?.message ?? error?.data?.message ?? "Unexpected Error Encountered.")
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error])
    return (
        <>
            <MetaData title={"Process Payment"} />
            <CheckoutSteps activeStep={2} />
            <div className="payment_info-container">
                <div className="payment-detail">
                    <h3 >Final step, make the payment.</h3>
                    <p>To confirm your order, kindly complete your payment
                        using a valid credit/debit card.
                    </p>
                    <form onSubmit={paymentHandler} className="payment_form">
                        <div className='payment-field'>

                            <CreditCardIcon />
                            <CardNumberElement className='paymentInput' />
                        </div>

                        <div className='payment_form-lower'>
                            <div className='payment-field'>
                                <EventIcon />
                                <CardExpiryElement className='paymentInput' />
                            </div>

                            <div className='payment-field'>
                                <VpnKeyIcon />
                                <CardCvcElement className='paymentInput' />
                            </div>

                        </div>

                        <input
                            type="submit"
                            value={`Pay Now`}
                            ref={payBtn}
                            className="payment_form-btn"
                        />
                    </form>
                </div>
                <div className="payment-info">
                    <div >
                        <p>You've to pay,</p>
                        <div className='payment-info-price'>₹{orderInfo && orderInfo.totalPrice}</div>
                    </div>
                    <div className='payment-info-field'>
                        <div>
                            <CheckCircleIcon />
                            <span>Payment & Invoice</span>
                        </div>
                        <div>We'll worry about all the transaction and
                            payment. You can sit back and relax while you make your client happy.
                        </div>
                    </div>
                    <div className='payment-info-field'>
                        <div>
                            <CheckCircleIcon />
                            <span>Discount & Offers</span>
                        </div>
                        <div>You'll be provided with best discount and offers time to time and have access to our premium product and perks.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessPayment