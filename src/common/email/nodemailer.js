import nodemailer from "nodemailer";
import { env } from "../config/env.js";


const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:env.nodemailer.user,
            pass:env.nodemailer.password
        }
    })
export async function sendGmail(to, subject,html){
    
   await transporter.sendMail({
        from:`"From your only beloved, Sondo2a"<${env.nodemailer.user}>`,
        to:to,
        subject:subject,
        html:html
    })
}