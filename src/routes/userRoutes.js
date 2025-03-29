import express from  'express' 
import { userControllers , refreshTokenController } from '../controllers/index.js'
import {verifyToken} from '../utils/middlewares/authenticationMiddleware.js'

export const userRoutes = (dependencies)=>{
    const { registerUser  , verifyRegisteration , siginController , updateProfileController , verifyEmail  , verifyOtp} = userControllers(dependencies)
    const { refreshTOken } = refreshTokenController(dependencies)
    const router = express.Router()
    router.post('/register',registerUser)
    router.post('/verify',verifyRegisteration)
    router.post('/signin',siginController)
    router.post('/refresh',refreshTOken)
    router.post('/update-profile',verifyToken,updateProfileController)
    router.post('/send-email-verification',verifyToken,verifyEmail)
    router.post('/verify-otp',verifyToken,verifyOtp)
    return router
}   