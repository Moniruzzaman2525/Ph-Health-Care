import { assert } from "console";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";



const updateIntoDb = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await DcotorServices.updateIntoDb(id, req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Doctor updated successfully",
        data: result
    })

})

export const DoctorController = {
    updateIntoDb
}
