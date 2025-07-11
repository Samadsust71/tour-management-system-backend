/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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
    const updatedUser = await userServices.updateUser(userId,payload,decodedToken)

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
    const result = await userServices.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success:true,
      message: "All Users retrieved successfully",
      meta: result.meta,
      data: result.users,
    });
  }
);
export const userController = {
  createUser,
  getAllUsers,
  updateUser
};
