import React, { useState } from "react";
import Button from "../common/Button";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<boolean>;
  disabled?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, disabled = false }) => {
  const [title, setTitle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("La tarea no puede estar vacía");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const success = await onAddTask(trimmedTitle);

      if (success) {
        setTitle("");
      } else {
        setError("Error al añadir la tarea");
      }
    } catch (err) {
      console.log(err);
      setError("Ha ocurrido un error al añadir la tarea");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskTitle">Nueva Tarea</label>

        <div className="task-form">
          <input
            id="taskTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input"
            placeholder="¿Qué necesitas hacer?"
            disabled={isSubmitting || disabled}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting || disabled || !title.trim()}
          >
            Añadir
          </Button>
        </div>

        {error && <div className="error-message mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default TaskForm;
