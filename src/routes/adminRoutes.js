import express from 'express'
import { adminControllers } from '../controllers/index.js'
import { verifyToken } from '../utils/middlewares/authenticationMiddleware.js'
import { refreshTokenController } from '../controllers/index.js'
export const adminRoutes = (dependencies) => {
    const router = express.Router()
    const { verifylogin, fetchUsers, updateUserRole, addCategory, getCategory, updateCategory, deleteCategory } = adminControllers(dependencies)
    const { refreshTOken } = refreshTokenController(dependencies)

    router.post('/adminLogin', verifylogin)
    router.get('/users', verifyToken, fetchUsers)
    router.put('/users/:userId/role', verifyToken, updateUserRole)

    router.post('/refresh', refreshTOken)
    
    router.get('/category', verifyToken, getCategory)
    router.post('/category', verifyToken, addCategory)
    router.put('/category/:id', verifyToken, updateCategory)
    router.delete('/category/:id', verifyToken, deleteCategory)
    return router
}