import { Task, TaskInput } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}?_limit=10`);

  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }

  return response.json();
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }

  return response.json();
};

export const updateTask = async (id: number, task: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la tarea");
  }
};
