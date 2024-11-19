import express from 'express'
import {
    createProduct,
    createProductReview,
    deleteProduct,
    deleteProductReview,
    getAdminProducts,
    getAllProducts,
    getProductDetails,
    getProductReviews,
    updateProduct,
} from '../controllers/productController.js'
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js'
const router = express.Router()

router.route('/products').get(getAllProducts)

router
    .route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)

router.route('/product/:id').get(getProductDetails)

router.route('/products/new').post(createProduct)

router
    .route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct)

router.route('/product/:id').put(updateProduct)

router
    .route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)

router.route('/product/:id').delete(deleteProduct)

router
    .route('/admin/product/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews)

router.route('/delete/reviews').delete(isAuthenticatedUser, deleteProductReview)

export default router
