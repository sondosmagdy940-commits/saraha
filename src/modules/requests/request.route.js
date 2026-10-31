import { Router } from "express";
import * as requestController from "./request.controller.js";

const requestRouter = Router();


requestRouter.post("/identity-request", requestController.sendIdentityRequest);

requestRouter.get("/received/:userId", requestController.getReceivedRequests);

requestRouter.get("/sender/:userId", requestController.getSentRequests);

requestRouter.patch("/respond/:requestId", requestController.respondToRequest);

export default requestRouter;