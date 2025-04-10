import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const getAllAdminFromDb = async (params: any) => {
    const andConditions: Prisma.AdminWhereInput[] = []

    const { searchTerm, ...filterData } = params
    const adminSearchableFields = ['name', 'email']

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
        where: whereConditions
    })
    return result
}


export const adminServices = {
    getAllAdminFromDb
}
