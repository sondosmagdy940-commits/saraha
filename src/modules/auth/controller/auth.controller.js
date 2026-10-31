import { toMS } from "../../../pkg/utils/time.js";
import { validateBody } from "../../../common/validation/validation.js";
import { loginDTO, registerDTO, resetPasswordDTO, sendDTO, verifiyAccountDTO } from "../DTO/auth.dto.js";
import { login, ResetPassword, signup, verifiyAccount ,sendOtp, enable2StepVerification, verifiyCodeTooLogin} from "../service/auth.service.js";


export const register=async(req,res,next)=>{
    try{
      const data = validateBody(registerDTO,req.body);
      const userData = data;
      const createdUser= await signup(userData);
      res.status(201).json({
        message:"user created successfully",
        success:true,
        data:createdUser
      })
    }catch(error){
        next(error)
    }
}

export const verfiyAccount=async(req,res,next)=>{
    try{
       const data = validateBody(verifiyAccountDTO,req.body);
      const {email, code} = data;
      const updated= await verifiyAccount(email,code)
      res.status(201).json({
        message:"user Verified successfully",
        success:true,
        data:updated
      })
    }catch(error){
        next(error)
    }
}
export const verifiCodeToLogin=async(req,res,next)=>{
    try{
       const data = validateBody(verifiyAccountDTO,req.body);
      const {email, code} = data;
      const token= await verifiyCodeTooLogin(email,code)
       res.cookie('acccess-token',token,{
        httpOnly:true,
        maxAge:toMS(1,'hours')
      })
      res.status(201).json({
        message:"loggedin successfully",
        success:true
      })
    }catch(error){
        next(error)
    }
}


export const enableTwoStepVerification=async(req,res,next)=>{
    try{
      const {email, code} = req.body;
       await enable2StepVerification(email,code)
      res.status(201).json({
        message:"enable two step verfication successfully",
        success:true
      })
    }catch(error){
        next(error)
    }
}
export const logIn=async(req,res,next)=>{
    try{
       const data = validateBody(loginDTO,req.body)
      const {email, password} = data;
      const user= await login(email,password);
      if(!user){
        res.json({message:"check you inbox, we sent otp"})
      }
      res.cookie('acccess-token',user.token,{
        httpOnly:true,
        maxAge:toMS(1,'hours')
      })
      res.status(201).json({
        message:"user loggedin successfully",
        success:true
      })
    }catch(error){
        next(error)
    }
}
export const sendotp=async(req,res,next)=>{
    try{
       const data = validateBody(sendDTO,req.body)
      const {email} = data;
      const sent= await sendOtp(email);
      res.status(201).json({message: "check your email"})
    }catch(error){
        next(error)
    }
}

export const resetPassword=async(req,res,next)=>{
    try{
       const data = validateBody(resetPasswordDTO,req.body)
      const {email,code,newPassword} = data;
      const updated= await ResetPassword(email,code,newPassword);
      res.json({message:"password reset successfully"});
    }catch(error){
        next(error)
    }
}