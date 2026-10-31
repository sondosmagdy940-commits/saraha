import { Types } from "mongoose"
import {z} from "zod"
export const sendMessageDto= z.object({
    content: z.string().trim().min(3).max(100),
    receiver: z.string().trim().refine((val)=>{
        return Types.ObjectId.isValid(val)
    }),
     sender: z.string().trim().refine((val)=>{
        return Types.ObjectId.isValid(val)
    })

})