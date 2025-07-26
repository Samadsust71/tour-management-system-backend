/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { TErrorSources } from "../interfaces/error.types";
import {handleCastError,handlerDuplicateError,handlerValidationError,handlerZodError} from "../helpers/index.helpers";
import { deleteImageFromCLoudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async(error: any,req: Request,res: Response,next: NextFunction) => {
  if (envVars.NODE_ENV === "development") {
    console.log(error);
  }

  let statusCode = 500;
  let message = `Something went wrong`;
  let errorSources: TErrorSources[] = [];
  
   if (req.file) {
        await deleteImageFromCLoudinary(req.file.path)
    }

    if (req.files && Array.isArray(req.files) && req.files.length) {
        const imageUrls = (req.files as Express.Multer.File[]).map(file => file.path)

        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)))
    }
  //Duplicate error
  if (error.code === 11000) {
    const simplifiedError = handlerDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } 
  // Object ID error / Cast Error
  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } 
  else if (error.name === "ZodError") {
    const simplifiedError = handlerZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  //Mongoose Validation Error
  else if (error.name === "ValidationError") {
    const simplifiedError = handlerValidationError(error);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  } 
  else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } 
  else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? error : null,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
