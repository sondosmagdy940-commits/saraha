import express from "express";
import userRouter from "./modules/users/user.router.js";
import messageRouter from "./modules/message/message.Router.js";
import authRouter from "./modules/auth/auth.Router.js";
import connectDB from "./common/DB/mongoose.js";
const app= express();
 

app.use(express.json());

await connectDB();
app.use('/user',userRouter);
app.use('/message',messageRouter);
app.use('/auth',authRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
