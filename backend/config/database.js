import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './backend/config/config.env' })

const connectToDb = () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Authorization Failed: MONGO_URI is not defined.')
    }

    mongoose.set('strictQuery', true)
    mongoose
        .connect(
            'mongodb+srv://bharat:bharat@cluster0.mfnma.mongodb.net/Ecommerce',
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then((obj) => {
            console.log(
                `🟢 Database Connected , Host: ${obj.connections[0].host}`
            )
        })
        .catch((err) => {
            console.log(err)
        })
}
export default connectToDb
