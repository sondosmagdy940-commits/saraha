import mongoose from "mongoose";

const connectDB= async()=>{
    try{
      await mongoose.connect('mongodb://127.0.0.1:27017/saraha');
      console.log("mongodb connected successfully");
    }catch(error){
        console.log("mongodb connection failed:", error.message);
    }
}

export default connectDB ;