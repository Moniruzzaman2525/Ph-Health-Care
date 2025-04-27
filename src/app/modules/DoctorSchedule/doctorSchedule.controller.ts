

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { doctorScheduleService } from "./doctorSchedule.services";



const insertIntoDb = catchAsync(async (req: Request & {user?: IAuthUser}, res: Response, next: NextFunction) => {
    const user = req.user

    const result = await doctorScheduleService.insertIntoDb(user, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor schedule created successfully",
        data: result
    })
})

const getFromAllDb = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await doctorScheduleService.getFromAllDb()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor schedule created successfully",
        data: result
    })
})




export const doctorScheduleController = {
    insertIntoDb,
    getFromAllDb
}
