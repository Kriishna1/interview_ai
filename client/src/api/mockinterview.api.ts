import axios from 'axios';
import { MockInterview } from '@/vite-env';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/mockinterview`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create Interview
export const createInterview = async (interviewData: MockInterview) => {
  try {
    const response = await axiosInstance.post('/create', interviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating interview:',  (error as any).response.data.message);
    throw error;
  }
};

// Get All Interviews (No user ID required)
export const getAllInterviews = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching interviews:',  (error as any).response.data.message);
    throw error;
  }
};

// Get Interview by ID
export const getInterviewByID = async (interviewID: string) => {
  try {
    const response = await axiosInstance.get(`/${
      interviewID}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching interview by ID:',  (error as any).response.data.message);
    throw error;
  }
};

// Edit Interview
export const editInterview = async (interviewID: string, interviewData: MockInterview) => {
  try {
    const response = await axiosInstance.put(`/edit/${interviewID}`, interviewData);
    return response.data;
  } catch (error) {
    console.error('Error editing interview:',  (error as any).response.data.message);
    throw error;
  }
};

// Delete Interview
export const deleteInterview = async (interviewID: string) => {
  try {
    const response = await axiosInstance.delete(`/delete/${interviewID}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting interview:',  (error as any).response.data.message);
    throw error;
  }
};
