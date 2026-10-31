import Request from "./request.model.js";



export const findExistingRequestRepo = async (messageId, senderOfReq) => {
  return await Request.findOne({ messageId, senderOfReq });
};

export const createRequestRepo = async (requestData) => {
  return await Request.create(requestData);
};

export const findReceivedPendingRequestsRepo = async (userId) => {
  return await Request.find({
    receiverOfReq: userId,
    status: "pending",
  })
    .populate({
      path: "messageId",
      select: "content createdAt", 
    })
    .populate({
      path: "senderOfReq",
      select: "name profilePathPc gender", 
    })
    .sort({ createdAt: -1 }); 
};
export const findSentRequestsRepo = async (userId) => {
  return await Request.find({
    senderOfReq: userId,
  })
    .populate({
      path: "messageId",
      select: "content createdAt",
    })
    .populate({
      path: "receiverOfReq",
      select: "name profilePathPc gender",
    })
    .sort({ createdAt: -1 });
};


export const findRequestByIdRepo = async (requestId) => {
  return await Request.findById(requestId);
};

export const updateRequestStatusRepo = async (requestId, status) => {
  return await Request.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  );
};

