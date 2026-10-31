
import Conversation from "./Conversation.model.js"


export const createConversationRepo = async ({ sender, receiver}) => {
    return await Conversation.create({
        sender,
        receiver,
        messages: []
 } );
};
export const findConversationByRequestIdRepo = async (requestId) => {
  return await Conversation.findOne({ requestId });
};
export const findConversationByIdRepo = async (conversationId) => {
    return await Conversation.findById(conversationId);
};
export const addMessageToConversationRepo = async ({ conversationId, senderId, content }) => {
    return await Conversation.findByIdAndUpdate(
        conversationId,
        {
            $push: {
                messages: {
                    content: content,  
                    sender: senderId
                }
            }
        },
        { new: true }
    ).populate("messages.sender", "name profilePathPc");
};