

import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidationSchemas } from "./user.validation";

const router = express.Router();

router.get('/', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.getAllAdminFromDb)
router.get('/me', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), userController.getMyProfile)

router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = userValidationSchemas.createAdmin.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    }
)
router.post("/create-doctor", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = userValidationSchemas.createDoctor.parse(JSON.parse(req.body.data))
        return userController.createDoctor(req, res, next)
    }
)
router.post("/create-patient", fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = userValidationSchemas.createPatient.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
)
router.patch("/update-my-profile", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = JSON.parse(req.body.data)
        return userController.updateMyProfile(req, res, next)
    }
)

router.patch('/status/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.changeProfileStatus)



export const UserRoutes = router
