import { Request, Response } from "express";
import { userServices } from "./user.services";


const createAdmin = async (req: Request, res: Response) => {
    const result = await userServices.createAdmin()
    res.send(result)
}


export const userController = {
    createAdmin
}
