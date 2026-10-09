import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      length: 6, 
      trim: true
    },
    email:{
      type: String,
      required: true,
      lowercase:true,
      trim: true

    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: {
      createdAt:true,
      updatedAt:false
    },
  }
);
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model('OTP',otpSchema);
export default OTP;