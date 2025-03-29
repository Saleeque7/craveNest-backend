import { userRoutes } from "./userRoutes.js";
import { adminRoutes } from "./adminRoutes.js";
import express from 'express'
export const routes = (dependencies) => {
    const router = express.Router()
    router.use('/', userRoutes(dependencies))
    router.use('/admin', adminRoutes(dependencies))
    return router
}