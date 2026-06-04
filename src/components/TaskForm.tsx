import { useState } from "react";
import type { Task } from "../api/api";

type TaskStatus = Task["status"];

type TaskFormProps = {
    onSubmit: (taskData: {
        title: string;
        description: string;
        status: TaskStatus;
    }) => Promise<void>;
};

function TaskForm({ onSubmit }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>("To Do");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await onSubmit({ title, description, status });

        setTitle("");
        setDescription("");
        setStatus("To Do");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>

            <div>
                <label htmlFor="task-title">Title</label>
                <input
                    id="task-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="task-status">Status</label>
                <select
                    id="task-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;