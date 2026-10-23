import { MailjetProvider } from "../../pkg/email/mailjet.js";
import { env } from "../config/env.js";

export const mailjetProvider= new MailjetProvider({
    fromMail:env.Mailjet.fromMail,
    fromName:env.Mailjet.fromName,
    apiKey:env.Mailjet.apiKey,
    apiSecret:env.Mailjet.apiSecret
})