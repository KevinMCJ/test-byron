import React from "react";
import { Task } from "../../types";

interface TaskItemProps {
  task: Task;
  onToggleCompleted: (id: number) => Promise<boolean>;
  onRemoveTask?: (id: number) => Promise<boolean>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemoveTask }) => {
  const handleToggle = async () => {};

  const handleRemove = async () => {
    if (onRemoveTask) {
      await onRemoveTask(task.id);
    }
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-checkbox"
      />

      <span className={`task-title ${task.completed ? "completed" : ""}`}>
        {task.title}
      </span>

      {onRemoveTask && (
        <button
          onClick={handleRemove}
          className="delete-button"
          aria-label="Eliminar tarea"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      )}
    </li>
  );
};

export default TaskItem;
