
import express from 'express'
import { doctorScheduleController } from './dcotorSchedule.controller'


const router = express.Router()

router.post('/', doctorScheduleController.insertIntoDb)


export const DoctorScheduleRoutes = router
