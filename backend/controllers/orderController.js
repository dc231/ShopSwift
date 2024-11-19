import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import catchAsynchErrors from '../middlewares/catchAsyncError.js'
import ApiFeatures from '../utils/apiFeatures.js'

//Create New Order
export const newOrder = catchAsynchErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order,
    })
})

//Get Single Order
export const getSingleOrder = catchAsynchErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if (!order) {
        return next(new ErrorHandler('Order Not Found With This Id', 404))
    }

    res.status(200).json({
        success: true,
        order,
    })
})

//Get All Orders--Admin
export const getAllOrder = catchAsynchErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach((order) => (totalAmount += order.totalPrice))

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

//Update Order Status--Admin
export const updateOrderStatus = catchAsynchErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id)
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order Delivered Succesfully', 404))
    }
    if (order.orderStatus === 'Processing' && req.body.status == 'Shipped') {
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity)
        })
    }

    order.orderStatus = req.body.status
    if (req.body.status === 'Delivered') order.deliveredAt = Date.now()

    await order.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        order,
    })

    async function updateStock(id, quantity) {
        const product = await Product.findById(id)
        product.stock = product.stock - Number(quantity)
        await product.save()
    }
})

//delete Orders--Admin
export const deleteOrder = catchAsynchErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    await order.remove()
    res.status(200).json({
        success: true,
    })
})

//Get Logged in user Order
export const myOrders = catchAsynchErrors(async (req, res, next) => {
    const orders = await Order.find({ user: '658bff50199d4a7761be5c99' })
    res.status(200).json({
        success: true,
        orders,
    })
})
