import { Prisma, UserStatus } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../helpers/prisma";


const getAllAdminFromDb = async (params: any, options: any) => {
    const andConditions: Prisma.AdminWhereInput[] = []
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params

    if (params.searchTerm) {
        andConditions.push({
            OR: adminSearchableFields.map(field => ({
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
                    equals: filterData[key]
                }
            }))
        })
    }
    andConditions.push({
        isDeleted: false
    })

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }

    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' }
    })
    const total = await prisma.admin.count({ where: whereConditions })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getByIdFromDb = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        }
    })
    return result
}

const updateFromDb = async (id: string, payload: Partial<Prisma.AdminUpdateInput>) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    })
    const result = await prisma.admin.update({
        where: {
            id
        },
        data: payload
    })
    return result
}
const deleteFromDb = async (id: string) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    })
    const result = await prisma.$transaction(async (transactionClient) => {
       const adminDeleteData = await transactionClient.admin.delete({
           where: {
               id
           },
       })
       const userDeletedData = await transactionClient.user.delete({
           where: {
               email: adminDeleteData.email
           }
       })

        return adminDeleteData
    })
    return result
}
const softDeleteFromDb = async (id: string) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.$transaction(async (transactionClient) => {
       const adminDeleteData = await transactionClient.admin.update({
           where: {
               id
           },
           data: {
               isDeleted: true
           }
       })
       await transactionClient.user.update({
           where: {
               email: adminDeleteData.email
           },
           data: {
               status: UserStatus.DELETED
           }
       })

        return adminDeleteData
    })
    return result
}


export const adminServices = {
    getAllAdminFromDb,
    getByIdFromDb,
    updateFromDb,
    deleteFromDb,
    softDeleteFromDb
}
