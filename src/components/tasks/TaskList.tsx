import React, { useState } from "react";
import { Task } from "../../types";
import TaskItem from "./TaskItem";
import Loader from "../common/Loader";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleCompleted: (id: number) => Promise<boolean>;
  onRemoveTask?: (id: number) => Promise<boolean>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  error,
  onToggleCompleted,
  onRemoveTask,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (loading && tasks.length === 0) {
    return <Loader text="Cargando tareas..." />;
  }

  if (error && tasks.length === 0) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="task-list-container">
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
          type="button"
        >
          Todas
        </button>
        <button
          className={`filter-tab ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
          type="button"
        >
          Pendientes
        </button>
        <button
          className={`filter-tab ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
          type="button"
        >
          Completadas
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          {tasks.length === 0
            ? "No hay tareas disponibles"
            : "No hay tareas que coincidan con el filtro"}
        </div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleCompleted={onToggleCompleted}
              onRemoveTask={onRemoveTask}
            />
          ))}
        </ul>
      )}

      <div className="task-stats">
        <span>{tasks.length} tareas en total</span>
        <span>{tasks.filter((t) => t.completed).length} completadas</span>
        <span>{tasks.filter((t) => !t.completed).length} pendientes</span>
      </div>
    </div>
  );
};

export default TaskList;
