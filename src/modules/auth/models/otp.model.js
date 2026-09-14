import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      length: 6, 
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    }
  },
  {
    timestamps: true,
  }
);
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model('Otp',otpSchema);
export default Otp;