import React from "react";
import { Navigate } from "react-router";
import Header from "../components/common/Header";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import "../assets/styles/tasks.css";

const TasksPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { tasks, loading, error, addTask, toggleTaskCompleted, removeTask } =
    useTasks();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header title="Task Manager" />

      <main className="main-content">
        <h2 className="page-title">Mis Tareas</h2>

        <TaskForm onAddTask={addTask} disabled={loading} />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggleCompleted={toggleTaskCompleted}
          onRemoveTask={removeTask}
        />
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Task Manager App - Proyecto de Entrevista
        Técnica
      </footer>
    </div>
  );
};

export default TasksPage;
