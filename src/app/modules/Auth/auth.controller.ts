import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: result
    })
})

export const authController = {
    loginUser
}
