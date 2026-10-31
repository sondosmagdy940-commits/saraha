import fs from "node:fs";
import { userNotFound } from "../error.js";
import { findAndUpdate, findUserById } from "../repository/user.repository.js";

export const uploadProfile = async (userId, file) => {
    const user = await findUserById(userId);
    if (!user) throw userNotFound;

    if (user.profilePathPc) {
        fs.unlinkSync(user.profilePathPc)
    }
    await findAndUpdate(user.email, { profilePathPc: file.path })

}