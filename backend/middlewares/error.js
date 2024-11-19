import ErrorHandler from '../utils/errorHandler.js'

const ErrorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'
  // Wrong MongoDb Error
  if (err.name === 'CastError') {
    const message = `Resource Not found .Invalid : ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose Duplicate Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose JWT Error
  if (err.code === 'JsonWebTokenError') {
    const message = `Jason Web Token is Invalid , Please Try Again...`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose JWT Error
  if (err.code === 'TokenExpiredError') {
    const message = `Jason Web Token is Expired , Please Try Again...`
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message
  })
}
export default ErrorHandlerMiddleware
