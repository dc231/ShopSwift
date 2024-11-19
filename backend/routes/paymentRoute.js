import express from 'express'
import {
    processPayment,
    sendStripeApiKey,
} from '../controllers/paymentController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'
const router = express.Router()

router.route('/payment/process').get(processPayment)
router.route('/stripeapikey').get(isAuthenticatedUser, sendStripeApiKey)

export default router
