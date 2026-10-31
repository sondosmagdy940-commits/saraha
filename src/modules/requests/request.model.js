import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },

    senderOfReq: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverOfReq: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accept", "decline"],
      default: "pending",
    },
  },
  { timestamps: true }
);

 const RequestModel = model("RequestModel", schema);
 export default RequestModel;