import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import { pick } from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";


const getAllAdminFromDb = async (req: Request, res: Response) => {

    try {
        const filter = pick(req.query, adminFilterableField)
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        const result = await adminServices.getAllAdminFromDb(filter, options)

        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            meta: result.meta,
            data: result.data
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get admin",
        })
    }
}


export const adminController = {
    getAllAdminFromDb
}
