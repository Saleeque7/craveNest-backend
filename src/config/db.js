import mongoose from 'mongoose'
import config from "./config.js"
export const connectDb = async() => {
    try {
        await mongoose.connect(config.MONGO_URL)
    } catch (error) {
        console.error("error while connect db");
        setTimeout(connectDb,5000)
    }
}
