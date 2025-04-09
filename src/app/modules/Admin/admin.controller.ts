import { Request, Response } from "express";
import { adminServices } from "./admin.services";


const getAllAdminFromDb = async(req: Request, res: Response) => {
    try {
        const result = await adminServices.getAllAdminFromDb(req.query)

        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result
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
