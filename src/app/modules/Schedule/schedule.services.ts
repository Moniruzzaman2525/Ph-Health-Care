import { addHours, addMinutes, format } from "date-fns"
import prisma from "../../../helpers/prisma"


const insertIntoDb = async (payload: any) => {

    const { startDate, endDate, startTime, endTime } = payload
    const interValTime = 30

    const schedules = []

    const currentDate = new Date(startDate) // start date
    const lastDate = new Date(endDate) // end date
    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(startTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        )

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(endTime.split(':')[0])
                ),
                Number(endTime.split(':')[1])
            )
        )


        while (startDateTime < endDateTime) {
            const scheduleData = {
                startDateTime: startDateTime,
                endDateTime: addMinutes(startDateTime, interValTime)
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime
                }
            })
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                })

                schedules.push(result)
            }
            startDateTime.setMinutes(startDateTime.getMinutes() + interValTime)
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedules
}

export const scheduleServices = {
    insertIntoDb
}
