import { useState } from "react";
import type { Task } from "../api/api";

type TaskItemProps = {
  task: Task;
  onUpdate: (
    taskId: string,
    taskData: {
      title: string;
      description: string;
      status: Task["status"];
    }
  ) => Promise<void>;
  onDelete: (taskId: string) => void;
};

function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState<Task["status"]>(task.status);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onUpdate(task._id, { title, description, status });
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <article className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </article>
    );
  }

  return (
    <article className="card">
      <h3>{task.title}</h3>
      <p>{task.description || "No description provided."}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </article>
  );
}

export default TaskItem;