import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createProject,
  deleteProject,
  getProjects,
  type Project,
} from "../api/api";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

function Dashboard() {
  const { token, user } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      if (!token) return;

      try {
        setError("");
        setLoading(true);

        const data = await getProjects(token);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [token]);

  async function handleCreateProject(projectData: {
    name: string;
    description: string;
  }) {
    if (!token) return;

    const newProject = await createProject(projectData, token);
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }

  async function handleDeleteProject(projectId: string) {
    if (!token) return;

    await deleteProject(projectId, token);

    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
  }

  return (
    <main>
      <h1>Project Dashboard</h1>
      {user && <p>Welcome, {user.username}.</p>}

      <ProjectForm onSubmit={handleCreateProject} />

      {loading && <p>Loading projects...</p>}
      {error && <p>{error}</p>}

      {!loading && projects.length === 0 && <p>No projects yet.</p>}

      <section>
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={handleDeleteProject}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;