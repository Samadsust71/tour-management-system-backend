/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { IAuthProvider, IsActive } from "../user/user.interface";
import { sendEmail } from "../../utils/sendEmail";


const getNewAccessToken = async (refreshToken:string) => {
   const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
    accessToken: newAccessToken
    }
};


const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload.id != decodedToken.userId) {
        throw new AppError(401, "You can not reset your password")
    }

    const isUserExist = await User.findById(decodedToken.userId)
    if (!isUserExist) {
        throw new AppError(401, "User does not exist")
    }
    if (isUserExist.isDeleted) {
        throw new AppError(401, "User is deleted")
    }
    if (!isUserExist.isVerified) {
        throw new AppError(401, "User is not verified")
    }
    if(await bcrypt.compare(payload.newPassword, isUserExist.password as string)) {
        throw new AppError(httpStatus.BAD_REQUEST, "New password cannot be the same as the old password")}

    const hashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(envVars.SALT_VALUE)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
}


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

const forgotPassword = async (email: string) => {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }
    if (!isUserExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
        expiresIn: "10m"
    })

    const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

     await sendEmail({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgetPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    })

}
export const authServices = {
  getNewAccessToken,
  resetPassword,
  setPassword,
  changePassword,
  forgotPassword
};
