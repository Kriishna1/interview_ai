/// <reference types="vite/client" />

export interface Question {
  type: String;
  technology: String;
  question: String;
  answer: String;
  review: String;
}

export type ExperienceLevel = "Fresher" | "Junior" | "Mid-Level" | "Senior";

export interface MockInterview {
  _id?: Types.ObjectId;
  user?: User;
  jobRole: string;
  overallReview: string;
  overallRating: number;
  experienceLevel: ExperienceLevel;
  targetCompany: string;
  skills?: string[];
  dsaQuestions?: Question[];
  technicalQuestions?: Question[];
  coreSubjectQuestions?: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  firebaseUID?: string;
  interviewList: MockInterview[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface Notification {
  id: string; 
  type: 'success' | 'info' | 'warning' | 'error'; 
  message: string; 
}

