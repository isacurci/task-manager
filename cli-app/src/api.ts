import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('An unknown error occurred during login');
  }
};

export const createTask = async (title: string, description: string | undefined, token: string) => {
  try {
    const response = await api.post(
      '/tasks',
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to create task');
    }
    throw new Error('An unknown error occurred while creating the task');
  }
}; 