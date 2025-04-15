import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { AdminRoutes } from '../modules/Admin/admin.routes'
import { AuthRoutes } from '../modules/Auth/auth.routes'

const router = express.Router()

const modulesRoute = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
]

modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})

export default router
