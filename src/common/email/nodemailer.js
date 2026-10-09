import nodemailer from "nodemailer";
import { config } from "dotenv";
config();



const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: "sondosmagdy940@gmail.com",
            pass:"npkv szcj rfxg fdtm"
        }
    })
export async function sendGmail(to, subject,html){
    
   await transporter.sendMail({
        from:`"From your only beloved, Sondo2a"<sondosmagdy940@gmail.com>`,
        to:to,
        subject:subject,
        html:html
    })
}