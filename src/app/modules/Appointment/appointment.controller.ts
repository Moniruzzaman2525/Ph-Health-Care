import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AppointmentServices } from "./appointment.services";



const createAppointment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AppointmentServices.createAppointment()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully",
        data: result
    })
})



export const AppointmentController = {
   createAppointment
}
