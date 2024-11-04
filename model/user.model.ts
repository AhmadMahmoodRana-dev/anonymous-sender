import mongoose, { Schema, Document } from "mongoose";

// ## MESSAGE

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// ## USER

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  message: Message[];
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    unique: true,
    required: [true, "UserName is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [
      /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please Use a Valid Email Address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: 8,
    select: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is Required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is Required"],
  },
  message: [MessageSchema],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel;