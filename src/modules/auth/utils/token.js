import jwt from "jsonwebtoken";
import { toMS } from "../../../common/utils/utils.js";

export async function generateToken(payload){
return jwt.sign(payload,
    'KNKJJGDSKJHGDOIYUTE',
    {expiresIn:toMS(1,'hours')})
}