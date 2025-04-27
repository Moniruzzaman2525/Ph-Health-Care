import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { scheduleServices } from "./schedule.services";
import { pick } from "../../../shared/pick";



const insertIntoDb = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await scheduleServices.insertIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully",
        data: result
    })
})

const getFromAllDb = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const filters = pick(req.query, ['startDate', 'endDate'])

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await scheduleServices.getFromAllDb(filters, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule fetch successfully",
        data: result
    })
})

export const scheduleController = {
    insertIntoDb,
    getFromAllDb
}
