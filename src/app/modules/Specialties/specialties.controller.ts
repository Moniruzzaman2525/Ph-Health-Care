import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SpecialtiesServices } from "./specialties.services";




const insertIntoDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await SpecialtiesServices.insertIntoDB(req)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully",
        data: result
    })
})


export const SpecialtiesController = {
    insertIntoDB,
}
