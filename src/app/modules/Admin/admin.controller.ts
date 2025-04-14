import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.services";
import { pick } from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const getAllAdminFromDb = async (req: Request, res: Response, next: NextFunction) => {

    try {
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

    } catch (error) {
        next(error)
    }
}

const getByIdFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await adminServices.getByIdFromDb(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin fetched successfully",
            data: result
        })

    } catch (error: any) {
       next(error)
    }
}

const updateFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id
        const payload = req.body

        const result = await adminServices.updateFromDb(id, payload)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin updated successfully",
            data: result
        })

    } catch (error: any) {
       next(error)
    }
}



const deleteFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id
        const result = await adminServices.deleteFromDb(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })

    } catch (error: any) {
       next(error)
    }
}
const softDeleteFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = req.params.id
        const result = await adminServices.softDeleteFromDb(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })

    } catch (error: any) {
       next(error)
    }
}

export const adminController = {
    getAllAdminFromDb,
    getByIdFromDb,
    updateFromDb,
    deleteFromDb,
    softDeleteFromDb
}
