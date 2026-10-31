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
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;