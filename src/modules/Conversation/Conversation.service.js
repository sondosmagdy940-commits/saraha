import { log } from "node:console";
import { AppError } from "../../common/error/error.js";
import * as conversationRepo from "./Conversation.repo.js";

export const sendMessageInConversationService = async ( conversationId, userId, content ) => {
    console.log(conversationId);
    console.log(userId);
    console.log(content);
    
    const conversation = await conversationRepo.findConversationByIdRepo(conversationId);
    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    const senderId = conversation.sender?.toString();
    const receiverId = conversation.receiver?.toString();

    const isParticipant = 
        senderId === userId?.toString() || 
        receiverId === userId?.toString();

    if (!isParticipant) {
        throw new AppError("You are not authorized to send messages in this conversation", 403);
    }

    const updatedConversation = await conversationRepo.addMessageToConversationRepo({
        conversationId,
        senderId: userId,
        content
    });

    return updatedConversation;
};


export const getConversationMessagesService = async ({ conversationId, userId }) => {
    // 1. البحث عن المحادثة
    const conversation = await conversationRepo.findConversationByIdRepo(conversationId);
    if (!conversation)throw new AppError("Conversation not found", 404);
  

    const senderId = conversation.sender?._id?.toString() || conversation.sender?.toString();
    const receiverId = conversation.receiver?._id?.toString() || conversation.receiver?.toString();

    const isParticipant = 
        senderId === userId?.toString() || 
        receiverId === userId?.toString();

    if (!isParticipant) throw new AppError("You are not authorized to view this conversation", 403);
    return conversation;
};