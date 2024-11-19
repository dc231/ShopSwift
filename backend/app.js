import bodyParser from 'body-parser'
import cloudinary from 'cloudinary'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import ErrorHandlerMiddleware from './middlewares/error.js'
import app from './server.js'

dotenv.config({ path: './backend/config/config.env' })

process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`)
    console.log('Shutting Down the Server Due to Uncaught Error ')
    process.exit(1)
})

// MongoDb Imports
import MongoServer from './config/database.js'

// Routes Imports
import order from './routes/orderRoute.js'
import payment from './routes/paymentRoute.js'
import product from './routes/productRoute.js'
import user from './routes/userRoute.js'

app.use(
    '*',
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header(
            'Access-Control-Allow-Headers',
            'Origin,X-Requested-With,Content-Type'
        )
        next()
    }
)
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

// Connecting to DB

// cloudinary.config({
//   cloud_name: `${process.env.CLOUDINARY_NAME}`,
//   api_key: `${process.env.CLOUDINARY_API_KEY}`,
// api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`
// })

// Configuration

cloudinary.config({
    cloud_name: 'dbhf7xh4q',
    api_key: '887173712287675',
    api_secret: 'T8bjOinQ4NWc7mphFRuVA9PDifY',
})

app.get('/health-check', (_, res) =>
    res
        .status(200)
        .json({ status: 'OK', message: '🟢 Service is Up and running .' })
)
// Rotes
// ********Product Route*********** */
app.use('/api/v1', product)

// ********User Route*********** */
app.use('/api/v1', user)

// ********Order Route*********** */
app.use('/api/v1', order)

// ********Payment Route*********** */
app.use('/api/v1', payment)

// ********Error Handler Route*********** */
app.use(ErrorHandlerMiddleware)

const server = app.listen(process.env.PORT, async () => {
    await MongoServer()
    console.log(`Now Listening ✔`)
})

process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`)
    console.log('Shutting down the Server due to Unhandled Promise Rejection')
    server.close(() => {
        process.exit(1)
    })
})
