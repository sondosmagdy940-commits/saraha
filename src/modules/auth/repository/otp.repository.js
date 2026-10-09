import OTP from "../models/otp.model.js";

export const createOtp=(otpData)=>{
   return OTP.create(otpData);
}

export const findOtp=(email)=>{
   return OTP.findOne({email:email});
}

export const deleteOtp=(email)=>{
    return OTP.deleteMany({email:email});
}