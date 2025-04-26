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

        if (specialties && specialties.length > 0) {
            // delete specialties
            const deleteSpecialtiesId = specialties.filter((specialty: any) => specialty.isDelete)
            for (const specialty of deleteSpecialtiesId) {
                const createDoctorSpecialties = await transactionClient.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: doctor.id,
                        specialtiesId: specialty.specialtiesId
                   }
                })
            }

            // create specialties
            const createSpecialtiesId = specialties.filter((specialty: any) => !specialty.isDelete)
            for (const specialty of createSpecialtiesId) {
                const createDoctorSpecialties = await transactionClient.doctorSpecialties.create({
                    data: {
                        doctorId: doctor.id,
                        specialtiesId: specialty.specialtiesId
                    }
                })
            }
        }




        return updateDoctorData
    })


    return result
}


export const DoctorServices = {
    updateIntoDb
}
