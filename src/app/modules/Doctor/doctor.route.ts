

import express from 'express'
import { DoctorController } from './doctor.controller'

const router = express.Router()

router.patch('/:id', DoctorController.updateIntoDb)

export const DoctorRoutes = router

// same to admin

//  getAllAdminFromDb,
// getByIdFromDb,
//   updateFromDb,
//  deleteFromDb,
// softDeleteFromDb
