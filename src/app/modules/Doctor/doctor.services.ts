import prisma from "../../../helpers/prisma"


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
    updateIntoDb
}
