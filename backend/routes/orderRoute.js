import express from 'express';
import {
    deleteOrder,
    getAllOrder,
    getSingleOrder,
    myOrders,
    newOrder,
    updateOrderStatus
} from '../controllers/orderController.js';

import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router
    .route('/admin/orders')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrder);

router
    .route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus);

router
    .route('/admin/order/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
export default router;
