
import crypto from "crypto";
export function correlattionId(req,res,next){
    const id = crypto.randomUUID();
    req.correlattionId=id;
    res.setHeader('X-Correlation-Id',id);
    next();
}