
import express, { NextFunction, Request, Response } from 'express'
import { adminController } from './admin.controller'
import { AnyZodObject, z } from 'zod'


const router = express.Router()

const update = z.object({
    body: z.object({
        name: z.string().optional(),
        contactNumber: z.string().optional(),
    })
})

const validateRequest = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        next()
    } catch (error) {
        next(error)
    }
}


router.get('/', adminController.getAllAdminFromDb)
router.get('/:id', adminController.getByIdFromDb)
router.patch('/:id', validateRequest(update), adminController.updateFromDb)
router.delete('/:id', adminController.deleteFromDb)
router.delete('/soft/:id', adminController.softDeleteFromDb)

export const AdminRoutes = router
