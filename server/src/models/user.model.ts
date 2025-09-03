import { model, Schema, Types } from "mongoose";
import MockInterviewModel, { MockInterview } from "./mockinterview.model";

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  firebaseUID?: string;
  interviewList:MockInterview[] | [];
  createdAt?: Date;
  updatedAt?: Date;

}

const userSchema = new Schema<User>(
  {
    firebaseUID: {
      type: Schema.Types.String,
      required: false,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    interviewList:[{
      type:Schema.Types.ObjectId,
      ref:MockInterviewModel,
    }]

  },
  { timestamps: true } 
);

export const UserModel = model<User>("User", userSchema);
