import jwt from "jsonwebtoken";
import { toMS } from "../../../pkg/utils/time.js";

export async function generateToken(payload){
return jwt.sign(payload,
    'KNKJJGDSKJHGDOIYUTE',
    {expiresIn:toMS(1,'hours')})
}