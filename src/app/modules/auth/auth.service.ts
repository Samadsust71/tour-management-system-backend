/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IAuthProvider } from "../user/user.interface";




const getNewAccessToken = async (refreshToken:string) => {
   const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
    accessToken: newAccessToken
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword = async (oldPassword:string, newPassword:string, decodedToken:JwtPayload) => {
  return {}
};


const setPassword = async (userId:string, plainPassword:string) => {
   const user = await User.findById(userId)
   if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
   }
   
   if(user.password && user.auths.some(auth=> auth.provider === "google")){
      throw new AppError(httpStatus.BAD_REQUEST, "You have already set a password for your account. Please use the 'Change Password' option.");
   }

   const hashedPassword = await bcrypt.hash(plainPassword, Number(envVars.SALT_VALUE));
   const credentialProvider: IAuthProvider = {provider:"credentials", providerId:user.email}
   const auths:IAuthProvider[]= [...user.auths,credentialProvider]
   user.password = hashedPassword;
   user.auths = auths;
   await user.save();
};

const changePassword = async (oldPassword:string, newPassword:string, decodedToken:JwtPayload) => {
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
  resetPassword,
  setPassword,
  changePassword
};
