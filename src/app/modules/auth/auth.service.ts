/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";




const getNewAccessToken = async (refreshToken:string) => {
   const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
    accessToken: newAccessToken
    }
};
const resetPassword = async (oldPassword:string, newPassword:string, decodedToken:JwtPayload) => {
   const user = await User.findById(decodedToken.userId);
   const isPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string)
   if (!isPasswordMatch) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
   }

   user!.password = await bcrypt.hash(newPassword, Number(envVars.SALT_VALUE))

   user!.save()
};

export const authServices = {
  getNewAccessToken,
  resetPassword
};
