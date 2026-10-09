
import crypto from "node:crypto"

import { createUser } from "../repository/auth.repository.js";
import { createOtp, deleteOtp, findOtp } from "../repository/otp.repository.js";
import { sendGmail } from "../../../common/email/nodemailer.js";
import { findAndUpdate, findUserByEmail } from "../../users/repository/user.repository.js";
import { toMS } from "../../../common/utils/utils.js";
import { generateOtpCode } from "../../../common/utils/otp.js";
import { userAlreadyExist, userIsVerified, userNotFound, userNotVerified } from "../../users/error.js";
import {invaildOTP, otpExpired} from "../error.js"
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";


export const signup = async (userData) => {
    const userExist = await findUserByEmail(userData.email);

    if (userExist) throw userAlreadyExist;
    userData.password = await hashPassword(userData.password)
    const user = await createUser(userData);

    const otp =await generateOtpCode();
    const createdOtp = await createOtp({
        code: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMS(5,'minutes'))
    });
    await sendGmail(userData.email,
        'verfication code ',
        `<h1>your verfication code is ${otp}</h1>`

    )
    return createdOtp;
}
export const verifiyAccount = async (email, code) => {
    //check user exist 
    const user = await findUserByEmail(email);
    // if not throw error 
    if (!user) throw userNotFound;
    //if isverified = true throw error 
    if (user.isVerified === true) throw userIsVerified ;
    //if otp not exist >> expire >> throw error
    const otpExist = await findOtp(email);
    if (!otpExist) throw otpExpired;
    //if otp in DB != otp >> throw error
    if (otpExist.code !== code) throw invaildOTP ;
    // switch isverified= true 
    const updated = await findAndUpdate(email, { isVerified: true });
    //delete otp 
    return await deleteOtp(email);
}
export const login=async(email, password)=>{
 const user = await findUserByEmail(email);  
 if (!user) throw userNotFound;
 if(user.isVerified===false) throw userNotVerified;
 
 const match = await comparePassword(password.user.password)
if(!match) throw new Error('invalid password');
 const token=generateToken({id:user._id,email:user.email,name:user.name});
 return token ;
}
export const sendOtp =async(email)=>{
    // check user exist 
   const user= await findUserByEmail(email);
   if(!user)throw userNotFound;

   // delete otp from DB
   await deleteOtp(email);
   // generate otp 
   const code =await generateOtpCode();
   await createOtp({
        code: code,
        email:email,
        expiresAt: new Date(Date.now() + toMS(5,'minutes'))
    });

   // send email 
   await sendGmail(email,
        'new otp',
        `<h1>your code is ${code}</h1>`

    )
}
export const ResetPassword=async(email,code,newPassword)=>{
  // verify otp 
  const otp=await findOtp(email);
  if(!otp)throw otpExpired;
  if(otp.code!==code)throw invaildOTP;
  //HASH password
 const hashedPassword= await hashPassword(newPassword);
  //update user 
  await findAndUpdate(email,{password:hashedPassword});
  await deleteOtp(email);
}

