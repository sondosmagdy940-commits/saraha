import { AppError } from "../../common/error/error.js";

export const otpExpired=new AppError('otp expired',404);
export const invaildOTP=new AppError('invalid otp ',400);