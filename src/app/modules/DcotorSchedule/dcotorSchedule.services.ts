import prisma from "../../../helpers/prisma"


const insertIntoDb = async (user: any, payload: {
    scheduleIds: string[]
}) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            email: user.email
        }
    })

    console.log(payload.scheduleIds)
}

export const doctorScheduleService = {
    insertIntoDb
}
