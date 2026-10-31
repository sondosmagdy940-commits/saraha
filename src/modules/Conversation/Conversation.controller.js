import * as conversationService from "./Conversation.service.js";

export const sendMessageInConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { userId, content } = req.body;
    console.log(userId);
    

    const conversation = await conversationService.sendMessageInConversationService(
      conversationId,
      userId,
      content
    );
    return res.status(200).json({
      message: "Message sent successfully",
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

export const getConversationMessages = async (req, res, next) => {
  try {
    const { conversationId ,userId} = req.params;
    const conversation = await conversationService.getConversationMessagesService({
      conversationId,
      userId
    });

    return res.status(200).json({
      message: "Conversation messages fetched successfully",
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};