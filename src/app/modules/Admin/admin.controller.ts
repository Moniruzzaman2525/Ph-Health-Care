import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.services";
import { pick } from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";



const getAllAdminFromDb: RequestHandler = catchAsync(async (req, res, next) => {
    const filter = pick(req.query, adminFilterableField)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await adminServices.getAllAdminFromDb(filter, options)

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

const getByIdFromDb: RequestHandler = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await adminServices.getByIdFromDb(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin fetched successfully",
        data: result
    })
})

const updateFromDb: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const payload = req.body

    const result = await adminServices.updateFromDb(id, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin updated successfully",
        data: result
    })
})



const deleteFromDb: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await adminServices.deleteFromDb(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin deleted successfully",
        data: result
    })
})
const softDeleteFromDb: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await adminServices.softDeleteFromDb(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin deleted successfully",
        data: result
    })
})

export const adminController = {
    getAllAdminFromDb,
    getByIdFromDb,
    updateFromDb,
    deleteFromDb,
    softDeleteFromDb
}
