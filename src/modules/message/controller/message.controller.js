
import { validateBody } from "../../../common/validation/validation.js"
import { sendMessageDto } from "../DTO/dto.message.js"
import { sendMessage } from "../service/message.service.js"

export async function createMessage(req,res,next) {
    try{
        const data = validateBody(sendMessageDto,req.body)
        const {content , receiver, sender }=data;
        const createdMesage= await sendMessage(content,receiver,sender)
        res.status(201).json({
            message:"message created successfully",
            success:true,
            data:createdMesage
        })
    }catch(error){
        next(error)
    }
}