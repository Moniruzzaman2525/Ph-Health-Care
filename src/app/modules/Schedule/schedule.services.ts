import { addHours } from "date-fns"


const insertIntoDb = async (payload: any) => {

    const { startDate, endDate, startTime, endTime } = payload

    const currentData = new Date(startDate)
    const lastData = new Date(endDate)
    while (currentData <= lastData) {
        const startDateTime = new Date(
             addHours()
         )
    }
}

export const scheduleServices = {
    insertIntoDb
}
