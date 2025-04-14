import express from 'express'
import { userRoutes } from '../modules/User/user.routes'
import { AdminRoutes } from '../modules/Admin/admin.routes'

const router = express.Router()

const modulesRoute = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    }
]

modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})

export default router
