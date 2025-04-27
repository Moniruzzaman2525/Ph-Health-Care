import { addHours, addMinutes, format } from "date-fns"
import prisma from "../../../helpers/prisma"
import { Prisma, Schedule } from "@prisma/client"
import { ISchedule } from "./schedule.interface"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { IAuthUser } from "../../interfaces/common"


const insertIntoDb = async (payload: ISchedule): Promise<Schedule[]> => {

    const { startDate, endDate, startTime, endTime } = payload
    const interValTime = 30

    const schedules = []

    const currentDate = new Date(startDate) // start date
    const lastDate = new Date(endDate) // end date
    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(startTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        )

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(endTime.split(':')[0])
                ),
                Number(endTime.split(':')[1])
            )
        )


        while (startDateTime < endDateTime) {
            const scheduleData = {
                startDateTime: startDateTime,
                endDateTime: addMinutes(startDateTime, interValTime)
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime
                }
            })
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                })

                schedules.push(result)
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + interValTime)
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedules
}

const getFromAllDb = async (params: any, options: IPaginationOptions, user: IAuthUser) => {
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
export const scheduleServices = {
    insertIntoDb,
    getFromAllDb
}
