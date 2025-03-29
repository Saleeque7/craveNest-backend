import dotenv from 'dotenv'
dotenv.config()
export default {
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    baseURL:process.env.baseURL,
    EMAIL:process.env.EMAIL,
    PASSWORD:process.env.PASSWORD,
    REDISURL:process.env.REDISURL,
    JWT_SECRET:process.env.JWT_SECRET
}