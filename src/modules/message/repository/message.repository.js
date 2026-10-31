import Message from "../models/message.model.js"
export async function createMessage(content, receiver, sender) {
    return Message.create({
        content:content,
        receiver:receiver,
        sender:sender
    })
};
export const findMessageByIdRepo = async (messageId) => {
  return await Message.findById(messageId);
};