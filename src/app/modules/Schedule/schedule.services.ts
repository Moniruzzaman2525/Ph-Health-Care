import { addHours, format } from "date-fns"


const insertIntoDb = async (payload: any) => {

    const { startDate, endDate, startTime, endTime } = payload

    const currentData = new Date(startDate)
    const lastData = new Date(endDate)
    while (currentData <= lastData) {
        const startDateTime = new Date(
            addHours(
                `${format(currentData, 'yyyy-MM-dd')}`,
                Number(startTime.split(':')[0])
             )
        )
        const endDateTime = new Date(
            addHours(
                `${format(lastData, 'yyyy-MM-dd')}`,
                Number(endDate.split(':')[0])
             )
        )

        while (startDateTime <= endDateTime) {
            
        }
    }
}

export const scheduleServices = {
    insertIntoDb
}
