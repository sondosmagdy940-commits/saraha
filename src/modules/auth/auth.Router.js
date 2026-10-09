import { Router } from "express";
import { logIn, register, resetPassword, sendotp, verfiyAccount } from "./controller/auth.controller.js";
const authRouter=Router();
authRouter.post('/signup',register);
authRouter.patch('/verifiy-account',verfiyAccount);
authRouter.patch('/reset-password',resetPassword);
authRouter.post('/login',logIn);
authRouter.post('/send-otp',sendotp);
export default authRouter;