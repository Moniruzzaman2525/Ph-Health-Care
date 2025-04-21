
import express from 'express'
import { adminController } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { adminValidationSchemas } from './admin.validations'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.get('/', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), adminController.getAllAdminFromDb)
router.get('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.getByIdFromDb)
router.patch('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(adminValidationSchemas.update), adminController.updateFromDb)
router.delete('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.deleteFromDb)
router.delete('/soft/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.softDeleteFromDb)

export const AdminRoutes = router
