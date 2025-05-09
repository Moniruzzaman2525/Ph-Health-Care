import { Prisma } from "@prisma/client"
import prisma from "../../../helpers/prisma"
import { IPaginationOptions } from "../../interfaces/pagination"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { IAuthUser } from "../../interfaces/common"
import ApiError from "../../error/ApiError"
import httpStatus from "http-status"

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

    const andConditions: Prisma.DoctorSchedulesWhereInput[] = []

    if (startDate && endDate) {
        andConditions.push({
            AND: [
                {
                    schedule: {
                        startDateTime: {
                            gte: startDate
                        }
                    },
                },
                {
                    schedule: {
                        endDateTime: {
                            lte: endDate
                        }
                    }
                }
            ]
        })
    }

    if (Object.keys(filterData).length > 0) {

        if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'true') {
            filterData.isBooked = true
        }
        else if (typeof filterData.isBooked === 'string' && filterData.isBooked === 'false') {
            filterData.isBooked = false
        }
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: (filterData as any)[key],
                    },
                };
            }),
        });
    }

    const whereConditions: Prisma.DoctorSchedulesWhereInput = andConditions.length > 0 ? { AND: andConditions } : {}


    const result = await prisma.doctorSchedules.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {

                }
    })
    const total = await prisma.doctorSchedules.count({
        where: whereConditions,
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

const deleteFromDb = async (scheduleId: string, user: IAuthUser) => {

    const doctor = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user?.email
        }
    })

    const isBookedSchedule = await prisma.doctorSchedules.findFirst({
        where: {
            doctorId: doctor.id,
            scheduleId: scheduleId,
            isBooked: true
        }
    })
    
    if (isBookedSchedule) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You can not delete this schedule because of the schedule is already booked')
    }

    const result = await prisma.doctorSchedules.delete({
        where: {
            doctorId_scheduleId: {
                doctorId: doctor.id,
                scheduleId: scheduleId
            }
        }
    })
    return result
}

export const doctorScheduleService = {
    insertIntoDb,
    getMySchedule,
    deleteFromDb
}
