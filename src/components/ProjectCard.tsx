import { Link } from "react-router-dom";
import type { Project } from "../api/api";

type ProjectCardProps = {
  project: Project;
  onDelete: (projectId: string) => void;
};

function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <article className="card">
      <h2>{project.name}</h2>
      <p>{project.description || "No description provided."}</p>

      <Link to={`/projects/${project._id}`}>View Details</Link>

      <button onClick={() => onDelete(project._id)}>Delete</button>
    </article>
  );
}

export default ProjectCard;