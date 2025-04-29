import prisma from "../../../helpers/prisma"
import { IAuthUser } from "../../interfaces/common"


const createAppointment = async (user: IAuthUser) => {
    const patientData = await prisma.patient.findFirstOrThrow({
        where: {
            email: user?.email
        }
    })
    console.log(patientData)
}

export const AppointmentServices = {
    createAppointment
}
