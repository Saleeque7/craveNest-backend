import express from  'express' 
import { userControllers , refreshTokenController } from '../controllers/index.js'

export const userRoutes = (dependencies)=>{
    const { registerUser  , verifyRegisteration , siginController } = userControllers(dependencies)
    const { refreshTOken } = refreshTokenController(dependencies)
    const router = express.Router()
    router.post('/register',registerUser)
    router.post('/verify',verifyRegisteration)
    router.post('/signin',siginController)
    router.post('/refresh',refreshTOken)
    return router
}   