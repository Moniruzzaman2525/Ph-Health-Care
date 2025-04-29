import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { AdminRoutes } from '../modules/Admin/admin.routes'
import { AuthRoutes } from '../modules/Auth/auth.routes'
import { SpecialtiesRoute } from '../modules/Specialties/specialties.route'
import { DoctorRoutes } from '../modules/Doctor/doctor.route'
import { ScheduleRoute } from '../modules/Schedule/schedule.router'
import { DoctorScheduleRoutes } from '../modules/DoctorSchedule/doctorSchedule.route'
import { AppointmentRoutes } from '../modules/Appointment/appointment.route'

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
    {
        path: '/specialties',
        route: SpecialtiesRoute
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoute
    },
    {
        path: '/schedule',
        route: ScheduleRoute
    },
    {
        path: '/doctor-schedule',
        route: DoctorScheduleRoutes
    },
    {
        path: '/appointment',
        route: AppointmentRoutes
    },
]

modulesRoute.forEach(route => {
    router.use(route.path, route.route)
})

export default router
