import { Router } from "express";
import { createMessage } from "./controller/message.controller.js";
const messageRouter=Router();

messageRouter.post('/',createMessage)
export default messageRouter; 