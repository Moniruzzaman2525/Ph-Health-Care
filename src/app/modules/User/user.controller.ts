import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import { userFilterableField } from "./userconstant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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
const createPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createPatient(req)
    res.status(200).json({
        success: true,
        message: "Patient created successfully",
        data: result
    })
})
const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const result = await userServices.getMyProfile(user)
    res.status(200).json({
        success: true,
        message: "My profile data fetched",
        data: result
    })
})
const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const result = await userServices.updateMyProfile(user, req.body)
    res.status(200).json({
        success: true,
        message: "My profile updated",
        data: result
    })
})
const changeProfileStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await userServices.changeProfileStatus(id, req.body)
    res.status(200).json({
        success: true,
        message: "Users Profile status updated successfully",
        data: result
    })
})

const getAllAdminFromDb = catchAsync(async (req, res, next) => {
    const filter = pick(req.query, userFilterableField)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await userServices.getAllUserFromDb(filter, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin fetched successfully",
        data: result.data,
        meta: {
            page: result.meta.page,
            limit: result.meta.limit,
            total: result.meta.total
        }
    })
})

export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllAdminFromDb,
    changeProfileStatus,
    getMyProfile,
    updateMyProfile
}
