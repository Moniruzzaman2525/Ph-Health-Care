
import express from 'express'
import { adminController } from './admin.controller'


const router = express.Router()

router.get('/', adminController.getAllAdminFromDb)
router.get('/:id', adminController.getByIdFromDb)
router.patch('/:id', adminController.updateFromDb)

export const AdminRoutes = router
