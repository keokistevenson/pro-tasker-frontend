import type { Task } from "../api/api";

type TaskItemProps = {
  task: Task;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
  onDelete: (taskId: string) => void;
};

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  return (
    <article className="card">
      <h3>{task.title}</h3>
      <p>{task.description || "No description provided."}</p>

      <label>Status</label>
      <select
        value={task.status}
        onChange={(e) =>
          onStatusChange(task._id, e.target.value as Task["status"])
        }
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button onClick={() => onDelete(task._id)}>Delete</button>
    </article>
  );
}

export default TaskItem;