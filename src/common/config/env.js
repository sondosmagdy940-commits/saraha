import { z } from 'zod';
import { config } from "dotenv";
config();
const schema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URL: z.string(),
  JWT_SECRET: z.string(),
  MAIL_USER: z.string().trim().toLowerCase(),
  MAIL_PASSWORD: z.string(),
 // GOOGLE_WEB_OAUTH_CLIENT_ID: z.string(),
  REDIS_PORT: z.string().default('6379'),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  MAILJET_API_KEY: z.string(),
  MAILJET_SECRET_KEY: z.string(),
  FROM_MAIL: z.string().email(),
  FROM_NAME: z.string()
});

const parsed = schema.parse(process.env);

export const env = {
  port: Number(parsed.PORT),
  db: {
    url: parsed.MONGODB_URL,
  },
  redis: {
    host: parsed.REDIS_HOST,
    port: Number(parsed.REDIS_PORT),
    password: parsed.REDIS_PASSWORD,
  },
 /* google: {
    webClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
    iosClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
  },*/
  nodemailer: {
    user: parsed.MAIL_USER,
    password: parsed.MAIL_PASSWORD,
  },
  Mailjet:{
    apiKey:parsed.MAILJET_API_KEY,
    apiSecret:parsed.MAILJET_SECRET_KEY,
    fromMail:parsed.FROM_MAIL,
    fromName:parsed.FROM_NAME

  },
  jwt: {
    secret: parsed.JWT_SECRET,
  }
};