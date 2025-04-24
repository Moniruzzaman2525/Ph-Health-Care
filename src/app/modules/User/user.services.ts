
import { UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../helpers/prisma"
import { fileUploader } from "../../../helpers/fileUploader"
import { IFile } from "../../interfaces/file"


const createAdmin = async (req: any) => {

    const file: IFile = req.file
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
const createDoctor = async (req: any) => {

    const file: IFile = req.file
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.data.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.doctor.email,
        password: hashPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
         await transactionClient.user.create({
            data: userData
        })
        const createAdminData = await transactionClient.doctor.create({
            data: req.body.doctor
        })
        return createAdminData
    })

    return result
}

export const userServices = {
    createAdmin,
    createDoctor
}
