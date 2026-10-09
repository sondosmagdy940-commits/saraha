import crypto from "node:crypto"
export async function generateOtpCode(){
const otp = await crypto.randomInt(100000, 999999);
return otp;
}