
import express from 'express'
import { doctorScheduleController } from './doctorSchedule.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'


const router = express.Router()

router.post('/', auth(UserRole.DOCTOR), doctorScheduleController.insertIntoDb)
router.get('/', doctorScheduleController.getFromAllDb)


export const DoctorScheduleRoutes = router
