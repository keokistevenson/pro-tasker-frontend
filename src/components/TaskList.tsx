import type { Task } from "../api/api";
import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
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

function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <section>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;