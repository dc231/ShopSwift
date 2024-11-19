import ErrorHandler from '../utils/errorHandler.js'
import catchAsynchErrors from '../middlewares/catchAsyncError.js'
import User from '../models/userModel.js'
import sendToken from '../utils/jwtToken.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'
import cloudinary from 'cloudinary'

//Register A User
export const registerUser = catchAsynchErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })

    sendToken(user, 201, res)
})

export const loginUser = catchAsynchErrors(async (req, res, next) => {
    const { email, password } = req.body

    //checking if user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email And Password', 400))
    }

    const user = await User.findOne({ email: email }).select('+password')

    if (!user) {
        return next(
            new ErrorHandler(
                'Authorization Failed:Invalid Email or Password',
                401
            )
        )
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(
            new ErrorHandler(
                'Authorization Failed:Invalid Email or Password',
                401
            )
        )
    }
    sendToken(user, 200, res)
})

export const logoutUser = catchAsynchErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out',
    })
})

//Forgot Password
export const forgotPassword = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler('User Not Found', 404))

    //Get resetPasswordToken
    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    let resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/password/reset/${resetToken}`

    const message = `Your Password reset token is :-\n\n${resetPasswordUrl}
    \n\nIf you have not requested this email then, please ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopSwift Password Recovery',
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }
})

export const resetPassword = catchAsynchErrors(async (req, res, next) => {
    //craeating token hahsh
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({ resetPasswordToken })

    if (!user)
        return next(
            new ErrorHandler('Reset Password Token Invalid or Expirerd', 404)
        )

    if (req.body.password === req.body.confirmPassword) {
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
        sendToken(user, 200, res)
    } else return next(new ErrorHandler('Confirm Password is not Correct', 404))
})

//Get User Details
export const getUserDetails = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})

//Get User Password
export const updateUserPassword = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old Password Incorrect', 400))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(' Password Not Matched', 400))
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)
})

//Update User Profile
export const updateUserProfile = catchAsynchErrors(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id
        await cloudinary.v2.uploader.destroy(imageId)

        let myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user,
    })
})

//Get All Users--Admin

export const getAllUser = catchAsynchErrors(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users,
    })
})

//Get All Users

export const getUserDetailAdmin = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return next(new ErrorHandler('User Does Not Exist With GIven Id', 404))

    res.status(200).json({
        success: true,
        user,
    })
})

//Update User Role -- Admin
export const updateUserRole = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (!user)
        return next(new ErrorHandler('User Does Not Exist With GIven Id', 404))

    await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user,
    })
})

//Delete User Role -- Admin
export const deleteUser = catchAsynchErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return next(new ErrorHandler('User Doen Not Exist With Given Id', 404))
    const imageId = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(imageId)
    await user.remove()
    res.status(200).json({
        success: true,
        message: 'User Deleted Successfully',
    })
})
