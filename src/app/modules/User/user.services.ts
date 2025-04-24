
import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client"
import * as bcrypt from "bcrypt"
import prisma from "../../../helpers/prisma"
import { fileUploader } from "../../../helpers/fileUploader"
import { IFile } from "../../interfaces/file"
import { Request } from "express"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { userSearchableFields } from "./userconstant"


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

const getAllUserFromDb = async (params: any, options: IPaginationOptions) => {
    const andConditions: Prisma.UserWhereInput[] = []
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params

    if (params.searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }


    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            admin: true,
            Doctor: true,
            Patient: true
        }
    })
    const total = await prisma.user.count({ where: whereConditions })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}




export const userServices = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUserFromDb
}
