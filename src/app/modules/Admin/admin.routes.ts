
import express from 'express'
import { adminController } from './admin.controller'


const router = express.Router()

router.get('/', adminController.getAllAdminFromDb)

export const AdminRoutes = router
