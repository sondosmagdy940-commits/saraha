import * as requestService from "./request.service.js";

export const sendIdentityRequest = async (req, res, next) => {
  try {
    const { messageId, userId } = req.body;
    const result = await requestService.sendIdentityRequestService(messageId,userId);

    return res.status(201).json({
      message: "Identity request sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getReceivedRequests = async (req, res, next) => {
  try {
    const { userId }  = req.params;

    const requests = await requestService.getReceivedRequestsService(userId);

    return res.status(200).json({
      message: "Received requests fetched successfully",
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getSentRequests = async (req, res, next) => {
  try {
    const { userId } = req.params; 

    const requests = await requestService.getSentRequestsService(userId);

    return res.status(200).json({
      message: "Sent requests fetched successfully",
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};


export const respondToRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { status, userId } = req.body;

    const result = await requestService.respondToRequestService({
      requestId,
      userId,
      status,
    });

    return res.status(200).json({
      message: `Request ${status}ed successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
