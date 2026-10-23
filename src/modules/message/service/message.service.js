import { userNotFound } from "../../users/error.js";
import { findUserById } from "../../users/repository/user.repository.js";
import { createMessage } from "../repository/message.repository.js";

export async function sendMessage(content, receiver, sender){
    //check receiver exit 
    const receiverExist = await findUserById(receiver);
    if(!receiverExist)throw userNotFound;
    //save message in repo 
    return await createMessage(content,receiver,sender);
}