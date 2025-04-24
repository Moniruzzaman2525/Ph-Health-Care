
import { Admin, Doctor, Patient, UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../helpers/prisma"
import { fileUploader } from "../../../helpers/fileUploader"
import { IFile } from "../../interfaces/file"
import { Request } from "express"


const createAdmin = async (req: Request) : Promise<Admin> => {

    const file = req.file as IFile | undefined
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
const createDoctor = async (req: Request) : Promise<Doctor> => {

    const file  = req.file as IFile | undefined
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
const createPatient = async (req: Request) : Promise<Patient> => {

    const file  = req.file as IFile | undefined
    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file)
        req.body.data.patient.profilePhoto = uploadToCloudinary?.secure_url
    }

    const hashPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.patient.email,
        password: hashPassword,
        role: UserRole.PATIENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
         await transactionClient.user.create({
            data: userData
        })
        const createAdminData = await transactionClient.patient.create({
            data: req.body.patient
        })
        return createAdminData
    })

    return result
}

export const userServices = {
    createAdmin,
    createDoctor,
    createPatient
}
