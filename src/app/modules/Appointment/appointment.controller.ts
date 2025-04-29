import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AppointmentServices } from "./appointment.services";
import { IAuthUser } from "../../interfaces/common";



const createAppointment = catchAsync(async (req: Request & {user?: IAuthUser}, res: Response, next: NextFunction) => {

    const user = req.user

    const result = await AppointmentServices.createAppointment(user as IAuthUser)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Appointment booked successfully",
        data: result
    })
})



export const AppointmentController = {
    createAppointment
}
