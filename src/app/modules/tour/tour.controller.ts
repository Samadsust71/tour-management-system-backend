
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { tourService } from './tour.service';
import { ITour } from './tour.interface';

const createTour = catchAsync(async (req: Request, res: Response) => {
     const payload: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
    const result = await tourService.createTour(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await tourService.getAllTours(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result?.meta,
    });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
     const payload: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
    const result = await tourService.updateTour(id, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tourService.deleteTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});
const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await tourService.getAllTourTypes(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour types retrieved successfully',
        data: result,
    });
});


const createTourType = catchAsync(async (req: Request, res: Response) => {
    const body  = req.body;
    const result = await tourService.createTourType(body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour type created successfully',
        data: result,
    });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const result = await tourService.updateTourType(id, body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type updated successfully',
        data: result,
    });
});
const deleteTourType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tourService.deleteTourType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour type deleted successfully',
        data: result,
    });
});

export const tourController = {
    createTour,
    createTourType,
    getAllTourTypes,
    deleteTourType,
    updateTourType,
    getAllTours,
    updateTour,
    deleteTour,
};