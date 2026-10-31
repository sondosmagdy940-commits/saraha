import { AppError } from "../../common/error/error.js";
import { createConversationRepo, findConversationByRequestIdRepo } from "../Conversation/Conversation.repo.js";
import { findMessageByIdRepo } from "../message/repository/message.repository.js";
import * as requestRepo from "./request.repo.js";

export const sendIdentityRequestService = async ( messageId, userId ) => {
  console.log(messageId);
  console.log(userId);
  
  const message = await findMessageByIdRepo(messageId);
  if (!message || message.isDeleted) throw new AppError("message not found",404)

  if (message.receiver.toString() !== userId.toString()) throw new AppError("You are not authorized to request identity for this message",403)
   console.log(message);
  console.log(message.sender);
   
  if (!message.sender) throw new AppError("This message has no identifiable sender",400)
    
  const existingRequest = await requestRepo.findExistingRequestRepo(messageId, userId);
  if (existingRequest) throw new AppError("You have already sent an identity request for this message",409);

  const newRequest = await requestRepo.createRequestRepo({
    messageId: message._id,
    senderOfReq: userId,         
    receiverOfReq: message.sender, 
    status: "pending",
  });

  return newRequest;
};

export const getReceivedRequestsService = async (userId) => {
  const requests = await requestRepo.findReceivedPendingRequestsRepo(userId);
  
  return requests;
};

export const getSentRequestsService = async (userId) => {
  const requests = await requestRepo.findSentRequestsRepo(userId);
  return requests;
};


export const respondToRequestService = async ({ requestId, userId, status }) => {
  if (!["accept", "decline"].includes(status)) throw new AppError("Invalid status. Must be 'accept' or 'decline'",400)
 
  const request = await requestRepo.findRequestByIdRepo(requestId);
  if (!request)throw new AppError("Request not found",404)
    
  if (request.receiverOfReq.toString() !== userId.toString()) throw new AppError("You are not authorized to respond to this request",403)
   
  if (request.status !== "pending")throw new AppError(`This request has already been ${request.status}`,400)
    
  if (status === "decline") {
    const updatedRequest = await requestRepo.updateRequestStatusRepo(requestId, "decline");
    return { request: updatedRequest, conversation: null };
  }

  const updatedRequest = await requestRepo.updateRequestStatusRepo(requestId, "accept");
  let conversation = await findConversationByRequestIdRepo(requestId);
  console.log(request._id);
  console.log( request.senderOfReq);
  console.log( request.receiverOfReq);
  
  if (!conversation) {
    conversation = await createConversationRepo({
      sender: request.senderOfReq,     
      receiver: request.receiverOfReq
    });
  }

  return { request: updatedRequest, conversation };
};