export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  assignedTo: User | null;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export interface TaskResponse {
  data: Task;
}

export interface TasksResponse {
  status: string;
  results: number;
  data: {
    tasks: Task[];
  };
}

export interface UsersResponse {
  data: User[];
} 