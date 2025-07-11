import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes"
export const checkAuth = (...authRoles: string[]) => async(req: Request, res: Response, next: NextFunction) => {
   try {
      const accessToken = req.headers.authorization;
        if (!accessToken) {
             throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
        }
        const verifiedToken =  verifyAccessToken(accessToken, envVars.JWT_SECRET) as JwtPayload
        if (!authRoles.includes(verifiedToken.role)){
            throw new AppError(httpStatus.FORBIDDEN, "Forbidden access");
        }
        req.user = verifiedToken
        next()
   } catch (error) {
     next(error)
   }
}