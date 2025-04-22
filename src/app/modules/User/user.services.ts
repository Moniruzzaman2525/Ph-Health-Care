
import { UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../helpers/prisma"
import { fileUploader } from "../../../helpers/fileUploader"


const createAdmin = async (req: any) => {

    const file = req.file
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url
    }



    const hashPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
         await transactionClient.user.create({
            data: userData
        })
        const createAdminData = await transactionClient.admin.create({
            data: req.body.admin
        })
        return createAdminData
    })

    return result
}

export const userServices = {
    createAdmin
}
