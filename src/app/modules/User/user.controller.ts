import { Request, Response } from "express";
import { userServices } from "./user.services";


const createAdmin = async (req: Request, res: Response) => {
   try {
     const result = await userServices.createAdmin(req)
    res.status(200).json({
        success: true,
        message: "Admin created successfully",
        data: result
    })
   } catch (error: any) {
       res.status(500).json({
        success: false,
        message: error?.name || "Something went wrong",
        error
    })
   }
}


export const userController = {
    createAdmin
}
