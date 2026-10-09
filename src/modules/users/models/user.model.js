import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
    },
    provider: {
      type: String,
      enum: ['local', 'Google', 'facebook'],
      default: 'local',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    gender:{
      type:String,
      enum:['male','female'],
      default:'male'
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema);
export default User;