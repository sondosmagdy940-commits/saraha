import User from "../../users/models/user.model.js";

export const findUserByEmail = (email) => {
    return User.findOne({ email: email });
}

export const findAndUpdate = (email, updatedData) => {
    return User.findOneAndUpdate({ email: email }, updatedData, { returnDocument: 'after' });
}
export const findUserById = (id) => {
    return User.findOne({ _id: id });
}
