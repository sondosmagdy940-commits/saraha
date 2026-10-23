import { Router } from "express";
import { withCache } from "../../common/cache/withCache.js";
import User from "./models/user.model.js";
const userRouter = Router();
userRouter.get('/get-all-users',
   withCache(),
    async (req, res, next) => {
        console.log("here");
        
        const users = await User.find({});
        res.status(200).json({
            success: true,
            data: users
        });
        // return res.json(users); // cache + send response

    }
)
export default userRouter;  