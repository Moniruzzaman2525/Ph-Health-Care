import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authServices } from "./auth.service";
import { access } from "fs";



const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginUser(req.body)

    const { refreshToken } = result
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
})

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies
    const result = await authServices.refreshToken(refreshToken)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token generated successfully",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
})
const changePassword = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {

    const user = req.user
    const result = await authServices.changePassword(user, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changes successfully",
        data: result
    })
})
const forgotPassword = catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {

    const result = await authServices.forgotPassword( req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password changes successfully",
        data: result
    })
})

export const authController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword
}
