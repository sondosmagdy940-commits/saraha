
import express from "express";
import connectDB from "./common/DB/mongoose.js";
import router from "./router.js";
import { globalErrorHandller } from "./common/error/error.handler.js";
import { correlattionId } from "./common/correlationID/correlationID.js";
import { rateLimit } from 'express-rate-limit';
import { toMS } from "./pkg/utils/time.js";
import { AppError } from "./common/error/error.js";

const limiter = rateLimit({
  limit: 3,
  windowMs: toMS(1, 'minutes'),
  standardHeaders: "draft-8",
  handler: function (req, res, next) {
    next(new AppError(this.message, this.statusCode))
  }
});
const app = express();
app.use(express.json());
await connectDB();
app.use(correlattionId)
app.use('uploads', express.static('/uploads'));
app.use(limiter);
app.use('/api', router);
app.use(globalErrorHandller)
export default app;
