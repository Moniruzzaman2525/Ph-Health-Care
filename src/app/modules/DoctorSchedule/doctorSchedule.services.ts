import { Prisma } from "@prisma/client"
import prisma from "../../../helpers/prisma"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"


const insertIntoDb = async (user: any, payload: {
    scheduleIds: string[]
}) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
        doctorId: doctorData.id,
        scheduleId
    }))


    const result = await prisma.doctorSchedules.createMany({
        data: doctorScheduleData
    });

    return result
}
const getFromAllDb = async (params: any, options: IPaginationOptions) => {
    const andConditions: Prisma.ScheduleWhereInput[] = []
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.ScheduleWhereInput = { AND: andConditions }

    const result = await prisma.schedule.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' }
    })
    const total = await prisma.schedule.count({ where: whereConditions })
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

export const doctorScheduleService = {
    insertIntoDb,
    getFromAllDb
}
