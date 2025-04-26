import { Prisma } from "@prisma/client";
import prisma from "../../../helpers/prisma"
import { IPaginationOptions } from "../../interfaces/pagination";
import { IDoctorFilterRequest } from "./doctor.interface";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { doctorSearchableFields } from "./doctor.constants";


const getAllFromDB = async (
    filters: IDoctorFilterRequest
    ,
    options: IPaginationOptions,
) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;

    const andConditions: Prisma.DoctorWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: doctorSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (specialties && specialties.length > 0) {
        // Corrected specialties condition
        andConditions.push({
            doctorSpecialties: {
                some: {
                    specialties: {
                        title: {
                            contains: specialties,
                            mode: 'insensitive',
                        },
                    },
                },
            },
        });
    }

    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map(key => ({
            [key]: {
                equals: (filterData as any)[key],
            },
        }));
        andConditions.push(...filterConditions);
    }

    andConditions.push({
        iDeleted: false,
    });

    const whereConditions: Prisma.DoctorWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { createdAt: 'desc' },
        include: {
            doctorSpecialties: {
                include: {
                    specialties: true
                }
            }
        },
    });

    const total = await prisma.doctor.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};


const updateIntoDb = async (id: string, payload: any) => {

    const { specialties, ...doctorData } = payload

    const doctor = await prisma.doctor.findFirstOrThrow({
        where: {
            id
        }
    })

    await prisma.$transaction(async (transactionClient) => {
        const updateDoctorData = await transactionClient.doctor.update({
            where: {
                id
            },
            data: doctorData,
            include: {
                doctorSpecialties: true
            }
        })

        if (specialties && specialties.length > 0) {
            // delete specialties
            const deleteSpecialtiesId = specialties.filter((specialty: any) => specialty.isDelete)
            for (const specialty of deleteSpecialtiesId) {
                await transactionClient.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctor.id,
                        specialtiesId: specialty.specialtiesId
                    }
                })
            }

            // create specialties
            const createSpecialtiesId = specialties.filter((specialty: any) => !specialty.isDelete)
            for (const specialty of createSpecialtiesId) {
                await transactionClient.doctorSpecialties.create({
                    data: {
                        doctorId: doctor.id,
                        specialtiesId: specialty.specialtiesId
                    }
                })
            }
        }

    })


    const result = await prisma.doctor.findUnique({
        where: {
            id: doctor.id
        },
        include: {
            doctorSpecialties: true
        }
    })

    return result


}


export const DoctorServices = {
    updateIntoDb,
    getAllFromDB
}
