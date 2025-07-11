import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateAccessToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
};


export const verifyAccessToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
