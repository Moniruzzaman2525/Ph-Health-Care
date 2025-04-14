import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import { pick } from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";



const getAllAdminFromDb = async (req: Request, res: Response) => {

    try {
        const filter = pick(req.query, adminFilterableField)
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        const result = await adminServices.getAllAdminFromDb(filter, options)

        sendResponse(res, {
            statusCode: 200,
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
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to get admin",
            data: null
        })
    }
}

const getByIdFromDb = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await adminServices.getByIdFromDb(id)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin fetched successfully",
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.name || "Failed to get admin",
            error: error
        })
    }
}

const updateFromDb = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const payload = req.body

        const result = await adminServices.updateFromDb(id, payload)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin updated successfully",
            data: result
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to update admin",
            data: null
        })
    }
}



const deleteFromDb = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const result = await adminServices.deleteFromDb(id)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to delete admin",
            data: null
        })
    }
}
const softDeleteFromDb = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const result = await adminServices.softDeleteFromDb(id)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to delete admin",
            data: null
        })
    }
}

export const adminController = {
    getAllAdminFromDb,
    getByIdFromDb,
    updateFromDb,
    deleteFromDb,
    softDeleteFromDb
}
