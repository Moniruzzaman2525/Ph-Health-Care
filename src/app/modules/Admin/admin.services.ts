import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";


const prisma = new PrismaClient()

const calculatePagination = (options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string
}) => {

    const page = Number(options.page || 1)
    const limit = Number(options.limit || 10)
    const skip = (page - 1) * limit || 0

    const sortBy = options.sortBy || 'createdAt'
    const sortOrder = options.sortOrder || 'desc'

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }

}


const getAllAdminFromDb = async (params: any, options: any) => {
    const andConditions: Prisma.AdminWhereInput[] = []

    const {limit, skip, sortBy, sortOrder} = calculatePagination(options)
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

    const whereConditions: Prisma.AdminWhereInput = { AND: andConditions }

    const result = await prisma.admin.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' }
    })
    return result
}


export const adminServices = {
    getAllAdminFromDb
}
