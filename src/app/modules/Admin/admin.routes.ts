
import express from 'express'
import { adminController } from './admin.controller'


const router = express.Router()

router.get('/', adminController.getAllAdminFromDb)
router.get('/:id', adminController.getByIdFromDb)
router.patch('/:id', adminController.updateFromDb)
router.delete('/:id', adminController.deleteFromDb)
router.delete('/soft/:id', adminController.softDeleteFromDb)

export const AdminRoutes = router
