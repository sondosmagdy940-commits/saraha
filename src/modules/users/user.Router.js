import { Router } from "express";
import { withCache } from "../../common/cache/withCache.js";
import User from "./models/user.model.js";
import { uploadFile, uploadFilesArray } from "../../common/media/multer.js";
import { allowedFields, fileValidation } from "../../common/media/file.validation.js";
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

userRouter.post('/upload-profile', uploadFile('pp'), fileValidation(), (req, res, next) => {
    console.log(req.file);
    res.json({ message: "ok" })

})
userRouter.post('/upload-photos', uploadFilesArray('photos', 3), fileValidation(), (req, res, next) => {
    console.log(req.files);
    res.json({ message: "ok" })

})
userRouter.post(
    '/upload-cv', 
    uploadFile('cv', allowedFields.files), 
    fileValidation(allowedFields.files),
    (req, res, next) => {
        console.log(req.file); 
        res.json({ message: "ok" });
    }
);
export default userRouter;  