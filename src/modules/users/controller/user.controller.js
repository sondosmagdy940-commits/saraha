import { uploadProfile } from "../service/user.service.js"

export const updatePro=async(req, res, next)=>{
    try{
        await uploadProfile(req.user.id,req.file);
        res.json({
            message:"upload profile successfully",success:true
        })
    }catch(error){
        next(error)
    }

}