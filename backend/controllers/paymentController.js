import catchAsyncError from '../middlewares/catchAsyncError.js'
import pkg from './createPaymentIntent.cjs'
const { paymentIntent, customer } = pkg

export const processPayment = catchAsyncError(async (req, res, next) => {
    const myPayment = await paymentIntent()

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    })
})

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY,
    })
})
