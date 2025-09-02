import { User } from "../models/user.model"; 

declare global {
  namespace Express {
    interface Request {
      file?: {
        profilePicture?: Express.Multer.File[];
      };
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
      user?: User; 
    }
  }
}

export interface Question {
  type: String,
  technology: String,
  question: String,
  answer:String,
  review:String,
}
