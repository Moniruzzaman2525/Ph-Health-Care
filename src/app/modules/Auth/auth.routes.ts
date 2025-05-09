
import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();



router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.refreshToken);
router.post('/change-password', auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN), authController.changePassword)
router.post('/forget-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

export const AuthRoutes = router
