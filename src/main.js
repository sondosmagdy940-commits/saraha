
import express from "express";
import connectDB from "./common/DB/mongoose.js";
import  router  from "./router.js";
import { globalErrorHandller } from "./common/error/error.handler.js";
import { correlattionId } from "./common/correlationID/correlationID.js";
const app = express();
  app.use(express.json());
  await connectDB();
  app.use(correlattionId)
  app.use('/api',router);
  app.use(globalErrorHandller)
  export default app;
