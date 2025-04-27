
import express from 'express'
import { doctorScheduleController } from './dcotorSchedule.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'


const router = express.Router()

router.post('/', auth(UserRole.DOCTOR), doctorScheduleController.insertIntoDb)


export const DoctorScheduleRoutes = router
