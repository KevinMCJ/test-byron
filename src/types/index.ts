export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

export interface TaskInput {
  title: string;
  completed: boolean;
  userId?: number;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}
