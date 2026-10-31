
import crypto from "node:crypto"

import { createUser } from "../repository/auth.repository.js";
import { createOtp, deleteOtp, findOtp } from "../repository/otp.repository.js";
import { sendGmail } from "../../../common/email/nodemailer.js";
import { findAndUpdate, findUserByEmail } from "../../users/repository/user.repository.js";
import { toMS, toSecond } from "../../../pkg/utils/time.js";
import { generateOtpCode } from "../../../common/utils/otp.js";
import { userAlreadyExist, userIsVerified, userNotFound, userNotVerified } from "../../users/error.js";
import { invaildOTP, otpExpired } from "../error.js"
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { mailjetProvider } from "../../../common/email/mailjet.init.js";
import { cacheProvider } from "../../../common/cache/init.js";
import { AppError } from "../../../common/error/error.js";


export async function baseFun(email, code, factory) {
    //check user exist 
    const user = await findUserByEmail(email);
    // if not throw error 
    if (!user) throw userNotFound;
    //if otp not exist >> expire >> throw error
    //const otpExist = await findOtp(email);
    const otpExist = await cacheProvider.get(`otp${email}`)
    if (!otpExist) throw otpExpired;
    //if otp in DB != otp >> throw error
    if (otpExist !== code) throw invaildOTP;
    const result=await factory(user);
    //delete otp 
    // return await deleteOtp(email);
    await cacheProvider.del(`otp${email}`);
    return result;
}
export const signup = async (userData) => {
    const userExist = await findUserByEmail(userData.email);

    if (userExist) throw userAlreadyExist;
    userData.password = await hashPassword(userData.password)
    const user = await createUser(userData);

    const otp = await generateOtpCode();
    const createdOtp = await cacheProvider.set(`otp${userData.email}`, otp, toMS(5, 'minutes'))
    /*const createdOtp = await createOtp({
        code: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMS(5,'minutes'))
    });*/
    await mailjetProvider.sendMail(userData.email,
        'verfication code ',
        `<h1>your verfication code is ${otp}</h1>`

    )
    return createdOtp;
}
export const verifiyAccount = async (email, code) => {
    await baseFun(email, code,async (user)=>{
        if (user.isVerified === true) throw userIsVerified;
        // switch isverified= true 
        const updated = await findAndUpdate(email, { isVerified: true });
    })
}
export const enable2StepVerification = async (email, code) => {
    await baseFun(email, code, async() => {
        await findAndUpdate(email, { twoStepVerification: true });
    })
    
}

//login to two step verfication
export const verifiyCodeTooLogin = async (email, code) => {
   const{token}=await baseFun(email, code, async(user) => {
        const token = generateToken({ id: user._id, email: user.email, name: user.name });
        return token;
    });
    return token
}
export const login = async (email, password) => {
   // let cacheTries= await cacheProvider.get(`login-tries:${email}`)
   // if(cacheTries ==='0')throw new AppError("too many requests to login",429)
    const user = await findUserByEmail(email);
    if (!user) throw userNotFound;
    if (user.isVerified === false) throw userNotVerified;

    const match = await comparePassword(password, user.password)
    if (!match) throw new Error('invalid password');

    if (user.twoStepVerification == true) {
        const code = await generateOtpCode();
        await cacheProvider.set(`otp${email}`, code, toMS(5, 'minutes'))
        await mailjetProvider.sendMail(email,
            'new otp',
            `<h1>your code is ${code}</h1>`
            
        )
        return;
    }
    const token = generateToken({ id: user._id, email: user.email, name: user.name });

   // let cacheTTL = await cacheProvider.ttl(`login-tries:${email}`);
   // cacheTries= cacheTries ?? 4;
    //const ttl =cacheTTL==-2? toSecond(3,'minutes'):cacheTTL;
    //await cacheProvider.set(`login-tries:${email}`,cacheTries-1,ttl);

    return token;
}
export const sendOtp = async (email) => {
    // check user exist 
    const user = await findUserByEmail(email);
    if (!user) throw userNotFound;

    // delete otp from DB
    // await deleteOtp(email);
    // generate otp 
    const code = await generateOtpCode();
    /*await createOtp({
         code: code,
         email:email,
         expiresAt: new Date(Date.now() + toMS(5,'minutes'))
     });*/
    await cacheProvider.set(`otp${email}`, code, toMS(5, 'minutes'))

    // send email 
    await mailjetProvider.sendMail(email,
        'new otp',
        `<h1>your code is ${code}</h1>`

    )
}
export const ResetPassword = async (email, code, newPassword) => {
    // verify otp 
    const otp = await findOtp(email);
    if (!otp) throw otpExpired;
    if (otp.code !== code) throw invaildOTP;
    //HASH password
    const hashedPassword = await hashPassword(newPassword);
    //update user 
    await findAndUpdate(email, { password: hashedPassword });
    await deleteOtp(email);
}

