import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { otpService } from "./otp.service";


const sendOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, name } = req.body
    await otpService.sendOTP(email, name)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await otpService.verifyOTP(email, otp)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
})

export const otpController = {
    sendOTP,
    verifyOTP
};