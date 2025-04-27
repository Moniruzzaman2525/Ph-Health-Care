import prisma from "../../../helpers/prisma"


const insertIntoDb = async (user: any) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            email: user.email
        }
    })

    console.log(doctor)
}

export const doctorScheduleService = {
    insertIntoDb
}
