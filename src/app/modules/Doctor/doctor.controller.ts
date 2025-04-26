import { assert } from "console";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { DoctorServices } from "./doctor.services";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { doctorFilterableFields } from "./doctor.constants";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, doctorFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await DoctorServices.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Doctors retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});


const updateIntoDb = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await DoctorServices.updateIntoDb(id, req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Doctor updated successfully",
        data: result
    })

})

export const DoctorController = {
    updateIntoDb,
    getAllFromDB
}
