/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email is not registered with us"
    );
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }
    

    const userTokens = createUserTokens(isUserExist)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password:pass, ...rest} = isUserExist.toObject();

    return {
      accessToken: userTokens.accessToken,
      refreshToken:userTokens.refreshToken,
      user:rest
    }
};

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
  credentialsLogin,
  getNewAccessToken,
  resetPassword
};
