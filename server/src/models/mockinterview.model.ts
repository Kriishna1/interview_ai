import { model, Schema, Types } from "mongoose";
import User from "./user.model";
interface Question {
  question: string;
  answer: string;
  review: string;
}

export interface MockInterview {
  _id: Types.ObjectId;
  user: User;
  jobRole: string;
  overallReview: string;
  overallRating: number;
  experienceLevel: "Fresher" | "Junior" | "Mid-Level" | "Senior";
  targetCompany: string;
  skills?: string[];
  dsaQuestions?: Question[];
  technicalQuestions?: Question[];
  coreSubjectQuestions?: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

const mockInterviewSchema = new Schema<MockInterview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    overallReview: {
      type: String,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior"],
      required: true,
    },
    targetCompany: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    dsaQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
          default: "",
        },
        review: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],
    technicalQuestions: [
      {
        question: {
          type: String,
          required: true,
          default: "",
        },
        answer: {
          type: String,
          required: true,
          default: "",
        },
        review: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],
    coreSubjectQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
          default: "",
        },
        review: {
          type: String,
          required: true,
          default: "",
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MockInterviewModel = model<MockInterview>(
  "MockInterview",
  mockInterviewSchema
);
export default MockInterviewModel;
