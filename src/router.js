import { Router } from "express";
import messageRouter from "./modules/message/message.Router.js";
import authRouter from "./modules/auth/auth.Router.js";
import userRouter from "./modules/users/user.router.js";
import requestRouter from "./modules/requests/request.route.js";
import conversationRouter from "./modules/Conversation/Conversation.Route.js";
 const router = Router()
router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/request', requestRouter);
router.use('/conversation', conversationRouter);
router.use('/auth', authRouter);
export default router;
