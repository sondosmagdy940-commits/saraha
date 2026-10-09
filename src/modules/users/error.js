import { AppError } from "../../common/error/error.js";

export const userNotFound=new AppError(' user not found ',404);//404
export const userAlreadyExist = new AppError("user already exists",409);//409
export const userIsVerified =new AppError(' user already is Verified',400);//400
export const userNotVerified=new AppError('user not Verified',403);//403