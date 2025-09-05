import { MockInterview } from '@/vite-env';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/ai`;

interface GenerateRequest {
  interviewID: string;
}


interface GenerateReviewRequest{
  InterviewDetailsObject:MockInterview;
}
// Function to generate DSA questions
export const generateQuestions = async (data: GenerateRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatequestions`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate Questions: ${error}`);
  }
};



// Function to generate review
export const generateReview = async (data: GenerateReviewRequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_URL}/generatereview`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to generate Review: ${error}`);
  }
};
