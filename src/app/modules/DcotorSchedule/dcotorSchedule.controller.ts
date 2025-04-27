

import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { doctorScheduleService } from "./dcotorSchedule.services";



const insertIntoDb = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await doctorScheduleService.insertIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully",
        data: result
    })
})



export const doctorScheduleController = {
    insertIntoDb
}
