
import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { User } from "../user/user.model";
import { envVars } from "../../config/env";
import { generateAccessToken } from "../../utils/jwt";
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
    
    const jwtPayload={
        userId: isUserExist._id,
        email:isUserExist.email,
        role:isUserExist.role
    }

    const accessToken = generateAccessToken(jwtPayload, envVars.JWT_SECRET, envVars.EXPIRES_IN)

    return {
      accessToken
    }
};

export const authServices = {
  credentialsLogin
};
