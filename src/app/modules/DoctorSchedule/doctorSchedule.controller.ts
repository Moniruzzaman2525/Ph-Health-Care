

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { doctorScheduleService } from "./doctorSchedule.services";
import { pick } from "../../../shared/pick";



const insertIntoDb = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response, next: NextFunction) => {
    const user = req.user

    const result = await doctorScheduleService.insertIntoDb(user, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor schedule created successfully",
        data: result
    })
})


const getMySchedule = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response, next: NextFunction) => {

    const filters = pick(req.query, ['startDate', 'endDate'])

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const user = req.user
    const result = await doctorScheduleService.getMySchedule(filters, options, user as IAuthUser)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule fetch successfully",
        data: result
    })
})



export const doctorScheduleController = {
    insertIntoDb,
    getMySchedule
}
