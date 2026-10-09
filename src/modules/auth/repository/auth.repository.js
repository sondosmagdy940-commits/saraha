import User from "../../users/models/user.model.js";


export const createUser=(userDate)=>{
    return User.create(userDate);
}