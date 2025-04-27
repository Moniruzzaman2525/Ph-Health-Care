
import express from 'express'
import { doctorScheduleController } from './doctorSchedule.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'


const router = express.Router()

router.get('/my-schedule', auth(UserRole.DOCTOR), doctorScheduleController.getMySchedule)
router.post('/', auth(UserRole.DOCTOR), doctorScheduleController.insertIntoDb)



export const DoctorScheduleRoutes = router
