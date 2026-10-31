
import { Router } from "express";
import * as conversationController from "./Conversation.controller.js";

const conversationRouter = Router();


conversationRouter.post("/messages/:conversationId", conversationController.sendMessageInConversation);
conversationRouter.get("/messages/:conversationId/:userId", conversationController.getConversationMessages);
export default conversationRouter;