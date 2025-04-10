import { Request, Response } from "express";
import { adminServices } from "./admin.services";


const pick = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Partial<T> => {
    const finalObj: Partial<T> = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key]
        }
    }
    return finalObj
}

const getAllAdminFromDb = async (req: Request, res: Response) => {

    try {
        const filter = pick(req.query, ['name', 'email', 'searchTerm'])
        const result = await adminServices.getAllAdminFromDb(filter)

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
