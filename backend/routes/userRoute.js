import express from 'express';
import {
    deleteUser,
    forgotPassword,
    getAllUser,
    getUserDetailAdmin,
    getUserDetails,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    updateUserPassword,
    updateUserProfile,
    updateUserRole
} from '../controllers/userController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/password/update').put(isAuthenticatedUser, updateUserPassword);

router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);

router
    .route('/admin/users')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router
    .route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetailAdmin);

router
    .route('/admin/user/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);

router
    .route('/admin/user/:id')
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
