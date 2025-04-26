import prisma from "../../../helpers/prisma"


const updateIntoDb = async (id: string, payload: any) => {

    const { specialties, ...doctorData } = payload

    const doctor = await prisma.doctor.findFirstOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.$transaction(async (transactionClient) => {
        const updateDoctorData = await transactionClient.doctor.update({
            where: {
                id
            },
            data: doctorData,
            include: {
                doctorSpecialties: true
            }
        })

        for (const specialtiesId of specialties) {
            const createDoctorSpecialties = await transactionClient.doctorSpecialties.create({
                data: {
                    doctorId: doctor.id,
                    specialtiesId: specialtiesId
                }
            })
        }

        return updateDoctorData
    })


    return result
}


export const DoctorServices = {
    updateIntoDb
}
