import express from 'express'

const router = express.Router()

const modulesRoute = [
    {
        path: '/user',
        route: require('./user.routes')
    },
    {
        path: '/admin',
        route: require('./admin.routes')
    }
]

modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})

export default router
