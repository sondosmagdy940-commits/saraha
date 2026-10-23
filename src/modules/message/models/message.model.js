import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 10, 
      maxlength: 200,
      trim: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message',messageSchema);
export default Message;