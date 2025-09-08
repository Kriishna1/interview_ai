interface Question {
  question: string;
  answer: string;
  review: string;
  _id?:string
}

export interface Interview {
  _id: string;
  jobRole: string;
  overallReview: string;
  overallRating: number; 
  experienceLevel: "Fresher" | "Junior" | "Mid-Level" | "Senior";
  targetCompany: string;
  skills?: string[];
  dsaQuestions?: Question[];
  technicalQuestions?: Question[];
  coreSubjectQuestions?: Question[];
}
