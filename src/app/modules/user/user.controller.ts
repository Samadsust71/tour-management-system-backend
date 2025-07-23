/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUser(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success:true,
      message: "User created successfully",
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async(req: Request, res: Response, next: NextFunction)=>{
    const userId = req.params.id;
    const decodedToken = req.user; 
    const payload = req.body;
    const updatedUser = await userServices.updateUser(userId,payload,decodedToken as JwtPayload)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success:true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
  
)

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await userServices.getAllUsers(query as Record<string, string>);

     sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
  }
);
export const userController = {
  createUser,
  getAllUsers,
  updateUser
};
