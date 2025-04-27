
import express from "express";
import { scheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get('/', auth(UserRole.DOCTOR), scheduleController.getFromAllDb)
router.post('/', auth(UserRole.SUPER_ADMIN, UserRole.SUPER_ADMIN), scheduleController.insertIntoDb)
export const ScheduleRoute = router
