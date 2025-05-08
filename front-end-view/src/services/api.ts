import axios from 'axios';
import { AuthResponse, Task, TaskResponse, TasksResponse, User, UsersResponse } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async (): Promise<TasksResponse> => {
    const response = await api.get<TasksResponse>('/tasks');
    return response.data;
  },

  getTask: async (id: string): Promise<TaskResponse> => {
    const response = await api.get<TaskResponse>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<TaskResponse> => {
    const response = await api.post<TaskResponse>('/tasks', task);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<TaskResponse> => {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  moveTask: async (id: string, status: Task['status']): Promise<TaskResponse> => {
    const response = await api.patch<TaskResponse>(`/tasks/${id}/move`, { status });
    return response.data;
  },
};

// Users API (Admin only)
export const usersAPI = {
  getUsers: async (): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>('/users');
    return response.data;
  },

  getUser: async (id: string): Promise<{ status: string; data: { user: User } }> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: string, user: Partial<User>): Promise<{ status: string; data: { user: User } }> => {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
}; 