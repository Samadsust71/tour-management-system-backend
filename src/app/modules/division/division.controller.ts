import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { divisionService } from "./division.service";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(async (req: Request, res: Response) => {
     const payload: IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }
    const result = await divisionService.createDivision(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created",
        data: result,
    });
});

const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
     const query = req.query;
    const result = await divisionService.getAllDivisions(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await divisionService.getSingleDivision(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
    });
});

const updateDivision = catchAsync(async (req: Request, res: Response) => {
     const id = req.params.id;
    const payload: IDivision = {
        ...req.body,
        thumbnail: req.file?.path
    }

    const result = await divisionService.updateDivision(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated",
        data: result,
    });
});

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await divisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});

export const divisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};