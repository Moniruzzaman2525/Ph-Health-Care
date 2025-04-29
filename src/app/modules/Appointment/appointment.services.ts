import prisma from "../../../helpers/prisma"
import { IAuthUser } from "../../interfaces/common"
import { v4 as uuidv4 } from 'uuid';


const createAppointment = async (user: IAuthUser, payload: any) => {

    const patientData = await prisma.patient.findFirstOrThrow({
        where: {
            email: user?.email
        }
    })

    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: payload.doctorId
        }
    })
    await prisma.doctorSchedules.findFirstOrThrow({
        where: {
            doctorId: payload.doctorId,
            scheduleId: payload.scheduleId,
            isBooked: false
        }
    })

    const videoCallingId = uuidv4()

    const result = await prisma.appointment.create({
        data: {
            patientId: patientData.id,
            doctorId: doctorData.id,
            scheduleId: payload.scheduleId,
            videoCallingId: videoCallingId
        }
    })
    return result
}

export const AppointmentServices = {
    createAppointment
}
