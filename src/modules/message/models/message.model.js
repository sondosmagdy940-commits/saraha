import mongoose from "mongoose";

const mongoose = require('mongoose');

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
      type: mongoose.Schema.Types.ObjectId
    
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message',messageSchema);
export default Message;