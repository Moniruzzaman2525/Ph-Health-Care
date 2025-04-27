import { Prisma } from "@prisma/client"
import prisma from "../../../helpers/prisma"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { IAuthUser } from "../../interfaces/common"


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

const getMySchedule = async (params: any, options: IPaginationOptions, user: IAuthUser) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { startDate, endDate, ...filterData } = params

    const andConditions: Prisma.ScheduleWhereInput[] = []

    if (startDate && endDate) {
        andConditions.push({
            AND: [
                {
                    startDateTime: {
                        gte: startDate
                    }
                },
                {
                    endDateTime: {
                        lte: endDate
                    }
                }
            ]
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

    const whereConditions: Prisma.ScheduleWhereInput = { AND: andConditions }

    const doctorSchedule = await prisma.doctorSchedules.findMany({
        where: {
            doctor: {
                email: user?.email
            }
        }
    })
    const doctorScheduleIds = doctorSchedule.map((schedule) => schedule.scheduleId)


    const result = await prisma.schedule.findMany({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' }
    })
    const total = await prisma.schedule.count({
        where: {
            ...whereConditions,
            id: {
                notIn: doctorScheduleIds
            }
        }
    })
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
    getMySchedule
}
