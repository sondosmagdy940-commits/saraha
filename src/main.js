import { config } from "dotenv";
config();
import express from "express";
import userRouter from "./modules/users/user.router.js";
import messageRouter from "./modules/message/message.Router.js";
import authRouter from "./modules/auth/auth.Router.js";
import connectDB from "./common/DB/mongoose.js";
import { logger } from "./common/logger/logger.js";

const app= express();
 

app.use(express.json());

await connectDB();
app.use('/user',userRouter);
app.use('/message',messageRouter);
app.use('/auth',authRouter);

app.use((error,req,res,next)=>{
  logger.error(error.message,error)
  if(error.isOpreational ===true){
    res.json({
    message:error.message,
    success:false,
    stack:error.stack
  })
  }
  return res.status(500).json({
    error:"something was wrong",
    success:false
  })
})

app.listen(3000, () => {
  logger.info("server is running on port 3000");
});

