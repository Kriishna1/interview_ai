import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/users`;

interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  firebaseUID?: string;
}

interface LoginUserPayload {
  email?: string;
  password?: string;
  firebaseUID?: string;
}

interface EditUserPayload {
  name?: string;
  email?: string;
}

export const getUser = async () => {
  try{
    const response = await axios.get(`${API_URL}/getuserdetails`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    return response.data;
  }
  catch(error){
    console.error("Error getting user details:", (error as any).response.data.message);
    throw error;
  }
}

// Register User
export const registerUser = async (userData: RegisterUserPayload) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", (error as any).response.data.error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData: LoginUserPayload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });
    // console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error in user Registration:", (error as any).response.data.message);
    throw error;
  }
};

// Edit User
export const editUser = async (userData: EditUserPayload) => {
  try {
    const response = await axios.put(`${API_URL}/edit`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", (error as any).response.data.message);
    throw error;
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`, 
      {}, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensures the request includes credentials
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", (error as any).response?.data?.message);
    throw error;
  }
};

