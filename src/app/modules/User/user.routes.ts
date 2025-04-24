

import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidationSchemas } from "./user.validation";

const router = express.Router();



router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = userValidationSchemas.createAdmin.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    }
)
router.post("/create-doctor", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {

        req.body = userValidationSchemas.createAdmin.parse(JSON.parse(req.body.data))
        return userController.createAdmin(req, res, next)
    }
)


export const UserRoutes = router
