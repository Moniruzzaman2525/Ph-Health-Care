import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";


const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAdmin(req)
    res.status(200).json({
        success: true,
        message: "Admin created successfully",
        data: result
    })
})
const createDoctor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createDoctor(req)
    res.status(200).json({
        success: true,
        message: "Doctor created successfully",
        data: result
    })
})

export const userController = {
    createAdmin,
    createDoctor
}
