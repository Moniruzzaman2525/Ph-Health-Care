import prisma from "../../../helpers/prisma"


const updateIntoDb = async (id: string, payload: any) => {
    const doctor = await prisma.doctor.findFirstOrThrow({
        where: {
            id
       }
    })

    const updateDoctorData = await prisma.doctor.update({
        where: {
            id
        },
        data: payload
    })

    return updateDoctorData
}


export const DoctorServices = {
    updateIntoDb
}
