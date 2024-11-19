import Product from '../models/productModel.js'
import ErrorHandler from '../utils/errorHandler.js'
import catchAsyncErrors from '../middlewares/catchAsyncError.js'
import ApiFeatures from '../utils/apiFeatures.js'
import cloudinary from 'cloudinary'

//Crate Product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    const imagesLink = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products',
        })
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }
    req.body.images = imagesLink
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    return res.status(201).json({
        success: true,
        product,
    })
})

//Get all Products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 10
    const productsCount = await Product.countDocuments()
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .sort()
        .pagination(resultPerPage)

    const products = await apiFeature.query

    return res.status(201).json({
        success: true,
        products,
        productsCount,
    })
})

//Get all Products ADMIN
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()

    return res.status(200).json({
        success: true,
        products,
    })
})

//Get Product Details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    return res.status(201).json({
        success: true,
        product,
    })
})

//Update Product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))

    //New Images From User
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        //Deleting images from Cloudinary
        for (let i = 0; i < product?.images?.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
    }

    const imagesLink = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products',
        })
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }
    req.body.images = imagesLink

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })
    return res.status(200).json({
        success: true,
        product,
    })
})

//Delete A Products
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) return next(new ErrorHandler('Product not found', 404))

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await Product.deleteOne(product._id)
    return res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully',
    })
})

//Create New Review Or Update Review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const Review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        rating: Number(rating),
        comment,
        productId,
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    )
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                ;(rev.rating = rating), (rev.comment = comment)
            }
        })
    } else {
        product.reviews.push(Review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0
    product.ratings = product.reviews.forEach((rev) => {
        avg += Number(rev.rating)
    })
    product.ratings = avg / product.numOfReviews

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        product,
    })
})

//Get All Reviews Of A Product

export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

//Get All Reviews Of A Product

export const deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    )

    let avg = 0
    let ratings = product.reviews.forEach((rev) => {
        avg += Number(rev.rating)
    })
    product.ratings = reviews.length === 0 ? 0 : avg / reviews.length

    const numOfReviews = product.reviews.length
    await Product.findByIdAndUpdate(
        req.query.productId,
        { reviews, ratings, numOfReviews },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    )

    res.status(200).json({
        success: true,
    })
})
