import { useState, useEffect, useCallback } from "react";
import { Task } from "../types";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Error al cargar las tareas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title: string): Promise<boolean> => {
    try {
      setLoading(true);

      const tempId = Math.floor(Math.random() * -1000);

      const tempTask: Task = {
        id: tempId,
        title,
        completed: false,
        userId: 1,
      };

      setTasks((prevTasks) => [...prevTasks, tempTask]);

      try {
        await createTask({
          title,
          completed: false,
          userId: 1,
        });
      } catch (apiError) {
        console.error("Error al crear en API:", apiError);
      }

      return true;
    } catch (err) {
      setError("Error crítico al añadir la tarea");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompleted = async (id: number): Promise<boolean> => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return false;

    const newCompletedState = !taskToUpdate.completed;

    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: newCompletedState } : task
        )
      );

      if (id < 0) {
        return true;
      }

      try {
        await updateTask(id, {
          ...taskToUpdate,
          completed: newCompletedState,
        });
      } catch (apiError) {
        console.error("Error al actualizar en API:", apiError);
      }

      return true;
    } catch (err) {
      setError("Error crítico al actualizar la tarea");
      console.error(err);
      return false;
    }
  };

  const removeTask = async (id: number): Promise<boolean> => {
    const tasksCopy = [...tasks];

    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      if (id < 0) {
        return true;
      }

      try {
        await deleteTask(id);
      } catch (apiError) {
        console.error("Error al eliminar en API:", apiError);
      }

      return true;
    } catch (err) {
      setTasks(tasksCopy);
      setError("Error crítico al eliminar la tarea");
      console.error(err);
      return false;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    toggleTaskCompleted,
    removeTask,
  };
};
