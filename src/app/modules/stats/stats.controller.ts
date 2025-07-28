import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { statsService } from "./stats.service";


const getBookingStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await statsService.getBookingStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking stats fetched successfully",
        data: stats,
    });
});

const getPaymentStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await statsService.getPaymentStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment stats fetched successfully",
        data: stats,
    });
});

const getUserStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await statsService.getUserStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User stats fetched successfully",
        data: stats,
    });
});

const getTourStats = catchAsync(async (req: Request, res: Response) => {
    const stats = await statsService.getTourStats();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tour stats fetched successfully",
        data: stats,
    });
});

export const statsController = {
    getBookingStats,
    getPaymentStats,
    getUserStats,
    getTourStats,
};