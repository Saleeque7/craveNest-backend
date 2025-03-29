import express from 'express'
import { adminControllers  } from '../controllers/index.js'
export const adminRoutes = (dependencies) => {
    const router = express.Router()
    const { verifylogin , fetchUsers  , updateUserRole , addCategory , getCategory , updateCategory , deleteCategory} = adminControllers(dependencies)
    router.post('/adminLogin', verifylogin)
    router.get('/users', fetchUsers)
    router.put('/users/:userId/role', updateUserRole )

    router.get('/category' , getCategory )
    router.post('/category' , addCategory )
    router.put('/category/:id' , updateCategory )
    router.delete('/category/:id' , deleteCategory )
    return router
}