import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  getProjectById,
  getTasksForProject,
  updateTask,
  type Project,
  type Task,
} from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function ProjectDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjectAndTasks() {
      if (!id || !token) return;

      try {
        setError("");
        setLoading(true);

        const [projectData, taskData] = await Promise.all([
          getProjectById(id, token),
          getTasksForProject(id, token),
        ]);

        setProject(projectData);
        setTasks(taskData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not load project details."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjectAndTasks();
  }, [id, token]);

  async function handleCreateTask(taskData: {
    title: string;
    description: string;
    status: Task["status"];
  }) {
    if (!id || !token) return;

    const newTask = await createTask(id, taskData, token);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  async function handleStatusChange(taskId: string, status: Task["status"]) {
    if (!token) return;

    const updatedTask = await updateTask(taskId, { status }, token);

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
    );
  }

  async function handleDeleteTask(taskId: string) {
    if (!token) return;

    await deleteTask(taskId, token);

    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  }

  if (loading) {
    return (
      <main>
        <p>Loading project...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </main>
    );
  }

  if (!project) {
    return (
      <main>
        <p>Project not found.</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>{project.name}</h1>
      <p>{project.description || "No description provided."}</p>

      <TaskForm onSubmit={handleCreateTask} />

      <TaskList
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
      />
    </main>
  );
}

export default ProjectDetails;